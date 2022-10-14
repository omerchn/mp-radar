import { useEffect, useRef } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Icon, Marker as MarkerType } from 'leaflet'
import toast from 'react-hot-toast'

// types
import { type MpData } from '@/lib/trpc'

// mutations
import { useMpScore } from '@/lib/trpc'

// context
import { useUserLocation } from '@/context/UserLocation'

// custom hooks
import useLifeTimer from '@/hooks/useLifeTimer'
import useChooseOnce from '@/hooks/useChooseOnce'

// components
import IconButton from '@mui/material/IconButton'

// images
import mpIconImg from '@/assets/images/mp-marker.svg'
import seenImg from '@/assets/images/seen.svg'
import unseenImg from '@/assets/images/unseen.svg'

import SeenIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import UnseenIcon from '@mui/icons-material/VisibilityOffOutlined'

// styles
import './index.scss'

const mpIcon = new Icon({
  iconUrl: mpIconImg,
  iconSize: [25, 50],
  iconAnchor: [12.5, 50],
})

interface Props {
  mpData: MpData
  isDisabled?: boolean
}

export default function MpMarker({ mpData, isDisabled }: Props) {
  const markerRef = useRef<MarkerType>(null)

  const { closestMpId } = useUserLocation()
  const isClosest = closestMpId === mpData._id.toString()

  const { mutate: vote, isLoading: isScoreLoading } = useMpScore()

  const { timerString } = useLifeTimer({
    lifeStartDate: mpData.dateLastSeen,
    lifeSpanSeconds: Infinity,
  })

  const { choose, hasChosen, chosenOption } = useChooseOnce({
    key: mpData._id.toString(),
    options: ['seen', 'unseen'],
  })
  const canChoose = !hasChosen && !isScoreLoading

  useEffect(() => {
    if (isClosest) {
      markerRef.current?.openPopup()
    }
  }, [markerRef.current, closestMpId])

  const handleVote = (up: boolean) => {
    if (!canChoose) return
    vote(
      {
        mpId: mpData._id.toString(),
        up,
        dateSeen: new Date(),
      },
      {
        onSuccess: () => {
          choose(up ? 'seen' : 'unseen')
        },
        onError: () => {
          toast.error('אירעה שגיאה')
        },
      }
    )
  }

  useEffect(() => {
    let tId
    if (isScoreLoading) tId = toast.loading('טוען...', { duration: Infinity })
    else toast.dismiss(tId)
  }, [isScoreLoading])

  return (
    <>
      <Marker
        position={mpData.position}
        icon={mpIcon}
        ref={markerRef}
        title="מלשין"
        opacity={isDisabled ? 0.5 : 1}
      >
        <Popup closeButton={false} offset={[0, -45]} autoPan={false}>
          <div className="mp-popup">
            <div className="votes">
              <IconButton
                title="לא ראיתי"
                size="small"
                className={`vote ${
                  chosenOption
                    ? chosenOption === 'unseen'
                      ? 'chosen'
                      : 'not-chosen'
                    : ''
                }`}
                color="error"
                onClick={() => handleVote(false)}
              >
                <UnseenIcon />
              </IconButton>
              <IconButton
                title="ראיתי"
                size="small"
                className={`vote ${
                  chosenOption
                    ? chosenOption === 'seen'
                      ? 'chosen'
                      : 'not-chosen'
                    : ''
                }`}
                color="success"
                onClick={() => handleVote(true)}
              >
                <SeenIcon />
              </IconButton>
            </div>
            <div className="last-seen">
              <span>
                זמן מאז <br /> נראה לאחרונה
              </span>
              <span className="timer">{timerString}</span>
            </div>
            <div
              className={`score ${
                mpData.score > 0 ? 'pos' : mpData.score === 0 ? 'even' : 'neg'
              }`}
            >
              {Math.abs(mpData.score) || '-'}
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  )
}
