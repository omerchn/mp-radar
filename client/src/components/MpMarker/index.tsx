import { useEffect, useRef } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Icon, Marker as MarkerType } from 'leaflet'

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
  const isClosest = closestMpId === mpData.id

  const { mutate: vote, isLoading: isScoreLoading } = useMpScore()

  const { timerString } = useLifeTimer({
    lifeStartDate: mpData.dateLastSeen,
    lifeSpanSeconds: Infinity,
  })

  const { choose, hasChosen, chosenOption } = useChooseOnce({
    key: mpData.id,
    options: ['seen', 'unseen'],
  })
  const canChoose = !hasChosen && !isScoreLoading

  useEffect(() => {
    if (isClosest) {
      markerRef.current?.openPopup()
    }
  }, [markerRef.current, closestMpId])

  const handleUpvote = () => {
    if (!canChoose) return
    vote(
      {
        mpId: mpData.id,
        score: 1,
      },
      {
        onSuccess: () => {
          choose('seen')
        },
      }
    )
  }

  const handleDownvote = () => {
    if (!canChoose) return
    vote(
      {
        mpId: mpData.id,
        score: -1,
      },
      {
        onSuccess: () => {
          choose('unseen')
        },
      }
    )
  }

  return (
    <>
      <Marker
        position={mpData.position}
        icon={mpIcon}
        ref={markerRef}
        title="מלשין"
        opacity={isDisabled ? 0.5 : 1}
        interactive={!isDisabled}
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
                onClick={handleDownvote}
              >
                <img src={unseenImg} alt="unseen" />
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
                onClick={handleUpvote}
              >
                <img src={seenImg} alt="seen" />
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
