import { useEffect, useRef } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Icon, Marker as MarkerType } from 'leaflet'

// interfaces
import MpData from '@/interfaces/MpData'

// mutations
import {
  useRemoveMp,
  useSeenMp,
  useUnseenMp,
} from '@/lib/react-query/mutations'

// context
import { useUserLocation } from '@/context/UserLocation'

// custom hooks
import useLifeTimer from '@/hooks/useLifeTimer'

// defaults
import { MP_LIFE_SPAN_SECONDS } from '@/utils/defaults'

// components
import IconButton from '@mui/material/IconButton'

// images
import mpIconImg from '@/assets/images/mp-marker.svg'
import alertImg from '@/assets/images/alert.svg'
import seenImg from '@/assets/images/seen.svg'
import unseenImg from '@/assets/images/unseen.svg'

// styles
import './index.scss'

const mpIcon = new Icon({
  iconUrl: mpIconImg,
  iconSize: [25, 50],
  iconAnchor: [12.5, 50],
})

const alertIcon = new Icon({
  iconUrl: alertImg,
  iconSize: [30, 30],
  iconAnchor: [15, 80],
})

interface Props {
  mpData: MpData
}

export default function MpMarker({ mpData }: Props) {
  const markerRef = useRef<MarkerType>(null)

  const { closestMpId } = useUserLocation()
  const isClosest = closestMpId === mpData.id

  const { mutate: removeMp } = useRemoveMp(mpData.id)
  const { mutate: seenMp } = useSeenMp(mpData.id)
  const { mutate: unseenMp } = useUnseenMp(mpData.id)

  const { timerString, isDead } = useLifeTimer({
    lifeStartDate: mpData.dateLastSeen,
    lifeSpanSeconds: MP_LIFE_SPAN_SECONDS,
    onDead: removeMp,
  })

  useEffect(() => {
    if (isClosest) {
      markerRef.current?.openPopup()
    }
  }, [markerRef.current, closestMpId])

  const handleSeen = () => {
    seenMp()
  }

  const handleUnSeen = () => {
    unseenMp()
  }

  return !isDead ? (
    <>
      <Marker position={mpData.position} icon={mpIcon} ref={markerRef}>
        <Popup closeButton={false} offset={[0, -45]} autoPan={false}>
          <div className="mp-popup">
            <div className="votes">
              <IconButton
                size="small"
                className="vote"
                color="error"
                onClick={handleUnSeen}
              >
                <img src={unseenImg} alt="unseen" />
              </IconButton>
              <IconButton
                size="small"
                className="vote"
                color="success"
                onClick={handleSeen}
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
      {isClosest ? (
        <Marker
          position={mpData.position}
          icon={alertIcon}
          interactive={false}
          draggable
        />
      ) : null}
    </>
  ) : null
}
