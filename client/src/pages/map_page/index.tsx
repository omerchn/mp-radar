import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LatLng } from 'leaflet'

// queries
import { useAddMp, useMps } from '@/lib/trpc'

// context
import { UserLocationProvider } from '@/context/UserLocation'

// components
import UserMarker from '@/components/UserMarker'
import MpMarker from '@/components/MpMarker'
import MarkerClusterGroup from '@/components/MarkerClusterGroup'
import AddMpMarker from '@/components/AddMpMarker'

// styles
import './index.scss'
import Overlay from './Overlay'

export default function Map() {
  const { data: mps } = useMps()
  const { mutate: addMp } = useAddMp()
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = (location: LatLng) => {
    addMp(
      {
        position: [location.lat, location.lng],
        dateSeen: new Date(),
      },
      {
        onSuccess: () => {
          setIsAdding(false)
        },
      }
    )
  }

  const handleCancel = () => {
    setIsAdding(false)
  }

  return (
    <>
      <MapContainer center={[31.7, 35.06]} zoom={8} preferCanvas>
        <UserLocationProvider>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UserMarker />
          <MarkerClusterGroup>
            {mps?.map((mp) => (
              <MpMarker key={mp.id} mpData={mp} isDisabled={isAdding} />
            ))}
          </MarkerClusterGroup>
          {isAdding && (
            <AddMpMarker onDone={handleAdd} onCancel={handleCancel} />
          )}
        </UserLocationProvider>
      </MapContainer>
      <Overlay onStartAdd={() => setIsAdding(true)} />
    </>
  )
}
