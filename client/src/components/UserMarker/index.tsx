import { useEffect, useRef } from 'react'
import { Marker, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'

// hooks
import useLocateUser from '@/hooks/useLocateUser'

// images
import userIconImg from '@/assets/images/user-marker.svg'

const userIcon = new Icon({
  iconUrl: userIconImg,
  iconSize: [30, 30],
})

interface Props {
  isDisabled?: boolean
  setView?: boolean
}

export default function UserMarker({ setView, isDisabled }: Props) {
  const map = useMap()
  const hasFlownToUser = useRef(false)
  const { userLocation } = useLocateUser({
    watch: true,
    setView,
  })

  const flyToUser = () => {
    if (!userLocation) return
    map.flyTo(userLocation, 14, {
      animate: false,
    })
  }

  useEffect(() => {
    if (hasFlownToUser.current || !userLocation) return
    flyToUser()
    hasFlownToUser.current = true
  }, [userLocation])

  return userLocation ? (
    <Marker
      position={userLocation}
      icon={userIcon}
      title="אני"
      interactive={false}
      zIndexOffset={-1}
      opacity={isDisabled ? 0.5 : 1}
    />
  ) : null
}
