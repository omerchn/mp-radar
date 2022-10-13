import { useEffect, useRef } from 'react'
import { Marker, useMap } from 'react-leaflet'

// images
import { useUserLocation } from '@/context/UserLocation'

interface Props {
  isDisabled?: boolean
}

export default function UserMarker({ isDisabled }: Props) {
  const { userLocation } = useUserLocation()
  const map = useMap()
  const hasFlownToUser = useRef(false)

  const flyToUser = () => {
    if (!userLocation) return
    map.flyTo(userLocation, 15, {
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
      title="אני"
      interactive={false}
      zIndexOffset={-1}
      opacity={isDisabled ? 0.5 : 1}
    />
  ) : null
}
