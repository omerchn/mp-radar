import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { LatLng, Map } from 'leaflet'
import toast from 'react-hot-toast'

// queries
import { useAddMp, useMps } from '@/lib/trpc'

// context
import { UserLocationProvider } from '@/context/UserLocation'

// components
import Overlay from './Overlay'
import UserMarker from '@/components/UserMarker'
import MpMarker from '@/components/MpMarker'
import MarkerClusterGroup from '@/components/MarkerClusterGroup'
import AddMpMarker from '@/components/AddMpMarker'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// styles
import './index.scss'

export default function MapPage() {
  const [map, setMap] = useState<Map>()
  const { data: mps, isLoading: mpsLoading } = useMps()
  const { mutate: addMp, isLoading: addMpLoading } = useAddMp()
  const [isAdding, setIsAdding] = useState(false)
  const isLoading = mpsLoading || addMpLoading

  const handleAdd = (location: LatLng) => {
    setIsAdding(false)
    addMp(
      {
        position: [location.lat, location.lng],
        dateSeen: new Date(),
      },
      {
        onError: () => {
          toast.error('אירעה שגיאה')
        },
      }
    )
  }

  useEffect(() => {
    let tId
    if (isAdding) tId = toast('גרור את הסימון למקום', { duration: Infinity })
    else toast.dismiss(tId)
  }, [isAdding])

  useEffect(() => {
    let tId
    if (isLoading) tId = toast.loading('טוען...', { duration: Infinity })
    else toast.dismiss(tId)
  }, [isLoading])

  return (
    <>
      <Fade in={isLoading} timeout={500}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 10000,
            color: 'white',
          }}
        >
          <Backdrop open>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </Fade>
      <MapContainer center={[31.7, 35.06]} zoom={8}>
        <UserLocationProvider>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <UserMarker isDisabled={isAdding} />
          <MarkerClusterGroup>
            {mps?.map((mp) => (
              <MpMarker
                key={mp._id.toString()}
                mpData={mp}
                isDisabled={isAdding}
              />
            ))}
          </MarkerClusterGroup>
          {isAdding && (
            <AddMpMarker
              onDone={handleAdd}
              onCancel={() => setIsAdding(false)}
            />
          )}
        </UserLocationProvider>
        <SetMap setMap={setMap} />
      </MapContainer>
      <Overlay
        onStartAdd={() => setIsAdding(true)}
        hideSpeedDial={isAdding}
        map={map}
      />
    </>
  )
}

interface Props {
  setMap: React.Dispatch<React.SetStateAction<Map | undefined>>
}
const SetMap = ({ setMap }: Props) => {
  const map = useMap()
  useEffect(() => setMap(map), [map])
  return null
}
