import { useEffect, useState } from 'react'
import { Icon, type LatLngExpression } from 'leaflet'
import { useMapEvents, Marker, Popup } from 'react-leaflet'

const userIcon = new Icon({
  iconUrl: '/src/assets/images/user-marker.svg',
  iconSize: [25, 75],
  iconAnchor: [0, 60],
})

export default function UserLocation() {
  const [position, setPosition] = useState<LatLngExpression | null>(null)

  const map = useMapEvents({
    locationfound: (e) => {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 13)
    },
  })

  useEffect(() => {
    map.locate()
  }, [map])

  return position ? <Marker position={position} icon={userIcon} /> : null
}
