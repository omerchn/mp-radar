import { MapContainer, TileLayer } from 'react-leaflet'

// queries
import { useMps } from '@/lib/react-query/queries'

// context
import { UserLocationProvider } from '@/context/UserLocation'

// components
import UserMarker from '@/components/UserMarker'
import MpMarker from '@/components/MpMarker'

// styles
import './index.scss'

export default function Map() {
  const { data: mps } = useMps()
  return (
    <>
      <MapContainer center={[31.7, 35.06]} zoom={8} zoomControl={false}>
        <UserLocationProvider>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UserMarker />
          {mps.map((mp) => (
            <MpMarker key={mp.id} mpData={mp} />
          ))}
        </UserLocationProvider>
      </MapContainer>
    </>
  )
}
