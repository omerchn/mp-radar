import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

// interfaces
import MpData from '@/interfaces/MpData'

// components
import MpPopup from './MpPopup'

// images
import mpIconImg from '@/assets/images/mp-marker.svg'

const mpIcon = new Icon({
  iconUrl: mpIconImg,
  iconSize: [25, 50],
  iconAnchor: [12.5, 50],
})

interface Props {
  mpData: MpData
}

export default function MpMarker({ mpData }: Props) {
  const handlePopupMount = (popup: any) => {
    setTimeout(() => {
      popup?.openPopup()
    }, 100)
  }

  return (
    <Marker position={mpData.position} icon={mpIcon} ref={handlePopupMount}>
      <Popup
        closeButton={false}
        closeOnClick={false}
        offset={[0, -45]}
        closeOnEscapeKey={false}
      >
        <MpPopup mpData={mpData} />
      </Popup>
    </Marker>
  )
}
