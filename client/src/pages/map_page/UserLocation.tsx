import { useEffect, useState } from 'react'
import { Icon, type LatLngExpression } from 'leaflet'
import { useMapEvents, Marker } from 'react-leaflet'

// images
import userIconImg from '@/assets/images/user-marker.svg'

const userIcon = new Icon({
  iconUrl: userIconImg,
  iconSize: [25, 50],
  iconAnchor: [12.5, 50],
})

export default function UserLocation() {
  const [position, setPosition] = useState<LatLngExpression>()

  const map = useMapEvents({
    locationfound: (e) => {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 15)
    },
  })

  useEffect(() => {
    map.locate()
  }, [map])

  const handleClick = () => {
    position && map.flyTo(position, 15)
  }

  return position ? (
    <Marker
      position={position}
      icon={userIcon}
      eventHandlers={{
        click: handleClick,
      }}
    />
  ) : null
}
