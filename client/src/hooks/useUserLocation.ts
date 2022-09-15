import { useState } from 'react'
import { LatLngExpression } from 'leaflet'
import { useMapEvents } from 'react-leaflet'

// custom hooks
import useInterval from './useInterval'

export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLngExpression>()

  const map = useMapEvents({
    locationfound: (e) => {
      setUserLocation(e.latlng)
    },
  })

  useInterval(() => {
    map.locate()
  }, 1000)

  return userLocation
}
