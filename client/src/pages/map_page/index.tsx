import { MapContainer, TileLayer } from 'react-leaflet'

// styles
import './index.scss'
import UserLocation from './UserLocation'
import MpLocations from './MpLocations'

export default function Map() {
  return (
    <MapContainer center={[31.7, 35.06]} zoom={8} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <UserLocation />
      <MpLocations />
    </MapContainer>
  )
}
