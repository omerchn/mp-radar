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
      // icon={userIcon}
      eventHandlers={{
        click: flyToUser,
      }}
    />
  ) : null
}
