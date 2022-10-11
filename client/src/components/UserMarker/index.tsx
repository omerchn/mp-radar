import { useEffect, useRef } from 'react'
import { Icon } from 'leaflet'
import { Marker, useMap } from 'react-leaflet'

// images
import userIconImg from '@/assets/images/user-marker.svg'
import { useUserLocation } from '@/context/UserLocation'

const userIcon = new Icon({
  iconUrl: userIconImg,
  iconSize: [25, 50],
  iconAnchor: [12.5, 50],
})

export default function UserMarker() {
  const { userLocation } = useUserLocation()
  const map = useMap()
  const hasFlownToUser = useRef(false)

  useEffect(() => {
    if (userLocation && !hasFlownToUser.current) {
      map.flyTo(userLocation, 15)
      hasFlownToUser.current = true
    }
  }, [userLocation])

  const handleClick = () => {
    if (userLocation) {
      map.flyTo(userLocation, 15)
    }
  }

  return userLocation ? (
    <Marker
      position={userLocation}
      icon={userIcon}
      eventHandlers={{
        click: handleClick,
      }}
    />
  ) : null
}
