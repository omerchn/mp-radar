import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

// interfaces
import MpData from '@/interfaces/MpData'

// components
import FromDateTimer from '@/components/FromDateTimer'
import IconButton from '@mui/material/IconButton'

// images
import mpIconImg from '@/assets/images/mp-marker.svg'
import SeenImg from '@/assets/images/seen.svg'
import UnseenImg from '@/assets/images/unseen.svg'

// styles
import './MpLocations.scss'

const mps: Array<MpData> = [
  {
    id: 'id1',
    position: [31.809, 34.767],
    dateSeen: new Date(),
    score: 0,
  },
]

const mpIcon = new Icon({
  iconUrl: mpIconImg,
  iconSize: [25, 50],
  iconAnchor: [12.5, 50],
})

export default function MpLocations() {
  const handlePopupMount = (popup: any) => {
    setTimeout(() => {
      popup?.openPopup()
    }, 100)
  }

  return (
    <div>
      {mps.map((mp) => (
        <Marker
          key={mp.id}
          position={mp.position}
          icon={mpIcon}
          ref={handlePopupMount}
        >
          <Popup
            closeButton={false}
            closeOnClick={false}
            offset={[0, -45]}
            closeOnEscapeKey={false}
          >
            <div className="mp-popup">
              <div className="votes">
                <IconButton size="small" className="vote">
                  <img src={UnseenImg} alt="unseen" />
                </IconButton>
                <IconButton size="small" className="vote">
                  <img src={SeenImg} alt="seen" />
                </IconButton>
              </div>
              <FromDateTimer date={mp.dateSeen} text="נראה לאחרונה" />
              <div
                className={`score ${
                  mp.score > 0 ? 'pos' : mp.score === 0 ? 'even' : 'neg'
                }`}
              >
                {Math.abs(mp.score) || '-'}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  )
}
