import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { LatLng } from 'leaflet'
import toast from 'react-hot-toast'

// queries
import { useAddMp, useMps } from '@/lib/trpc'

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
  const [followUser, setFollowUser] = useState(false)
  const { data: mps, isLoading: mpsLoading } = useMps()
  const { mutate: addMp, isLoading: addMpLoading } = useAddMp()
  const [isAdding, setIsAdding] = useState(false)
  const isLoading = mpsLoading || addMpLoading

  const handleAdd = (location: LatLng) => {
    setIsAdding(false)
    addMp(
      {
        position: [location.lat, location.lng],
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
    if (isAdding)
      tId = toast('יש לגרור את הסימון למקום', { duration: Infinity })
    else toast.dismiss(tId)
  }, [isAdding])

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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        <UserMarker isDisabled={isAdding} setView={followUser} />
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
          <AddMpMarker onDone={handleAdd} onCancel={() => setIsAdding(false)} />
        )}
        <ResetFollowUser
          followUser={followUser}
          setFollowUser={setFollowUser}
        />
      </MapContainer>
      <Overlay
        onStartAdd={() => setIsAdding(true)}
        hideSpeedDial={isAdding}
        followUser={followUser}
        setFollowUser={setFollowUser}
      />
    </>
  )
}

function ResetFollowUser({
  followUser,
  setFollowUser,
}: {
  followUser: boolean
  setFollowUser: React.Dispatch<React.SetStateAction<boolean>>
}) {
  useMapEvents({
    drag: () => followUser && setFollowUser(false),
  })
  return null
}
