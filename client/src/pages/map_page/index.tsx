import { MapContainer, TileLayer } from 'react-leaflet'

// styles
import './index.scss'

// interfaces
import MpData from '@/interfaces/MpData'

// components
import UserMarker from '@/components/UserMarker'
import MpMarker from '@/components/MpMarker'

const mps: Array<MpData> = [
  {
    id: 'id1',
    position: [31.809, 34.767],
    dateLastSeen: new Date(),
    score: -1,
  },
  {
    id: 'id2',
    position: [32.0733, 34.782],
    dateLastSeen: new Date(),
    score: 2,
  },
]

export default function Map() {
  return (
    <MapContainer center={[31.7, 35.06]} zoom={8} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <UserMarker />
      {mps.map((mp) => (
        <MpMarker key={mp.id} mpData={mp} />
      ))}
    </MapContainer>
  )
}
