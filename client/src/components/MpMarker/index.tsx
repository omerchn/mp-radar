import { useEffect, useRef } from 'react'
import { CircleMarker, Marker, Popup } from 'react-leaflet'
import {
  Icon,
  Marker as MarkerType,
  CircleMarker as CircleMarkerType,
} from 'leaflet'

// types
import { type MpData } from '@/lib/trpc'

// mutations
import { useMpScore } from '@/lib/trpc'

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
  const markerRef = useRef<CircleMarkerType>(null)

  const { closestMpId } = useUserLocation()
  const isClosest = closestMpId === mpData.id

  const { mutate: scoreMp } = useMpScore()

  const { timerString, isDead } = useLifeTimer({
    lifeStartDate: mpData.dateLastSeen,
    lifeSpanSeconds: MP_LIFE_SPAN_SECONDS,
  })

  useEffect(() => {
    if (isClosest) {
      markerRef.current?.openPopup()
    }
  }, [markerRef.current, closestMpId])

  const handleSeen = () => {
    scoreMp({
      mpId: mpData.id,
      score: 1,
    })
  }

  const handleUnSeen = () => {
    scoreMp({
      mpId: mpData.id,
      score: -1,
    })
  }

  return !isDead ? (
    <>
      {/* <Marker position={mpData.position} icon={mpIcon} ref={markerRef}> */}
      <CircleMarker center={mpData.position} color="red" ref={markerRef}>
        <Popup closeButton={false} autoPan={false}>
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
      </CircleMarker>
      {/* {isClosest ? (
        <Marker
          position={mpData.position}
          icon={alertIcon}
          interactive={false}
          draggable
        />
      ) : null} */}
    </>
  ) : null
}
