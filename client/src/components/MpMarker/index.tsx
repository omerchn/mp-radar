import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

// interfaces
import MpData from '@/interfaces/MpData'

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
  const { timerString, lifePercentage, isDead } = useLifeTimer({
    lifeStartDate: mpData.dateLastSeen,
    lifeSpanSeconds: MP_LIFE_SPAN_SECONDS,
  })

  return !isDead ? (
    <>
      <Marker position={mpData.position} icon={mpIcon}>
        <Popup closeButton={false} offset={[0, -45]} autoPan={false}>
          <div className="mp-popup">
            <div className="votes">
              <IconButton size="small" className="vote" color="error">
                <img src={unseenImg} alt="unseen" />
              </IconButton>
              <IconButton size="small" className="vote" color="success">
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
      <Marker
        position={mpData.position}
        icon={alertIcon}
        interactive={false}
        draggable
      />
    </>
  ) : null
}
