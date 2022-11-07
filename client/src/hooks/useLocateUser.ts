import { useEffect, useState, useLayoutEffect } from 'react'
import { type Map, type LatLng } from 'leaflet'
import { useMapEvents } from 'react-leaflet'
import toast from 'react-hot-toast'

export interface LocateUser {
  userLocation: LatLng | undefined
  isLocating: boolean
  map: Map
}

interface Props {
  watch?: boolean
  setView?: boolean
}

export default function useLocateUser(opts: Props = {}): LocateUser {
  const [userLocation, setUserLocation] = useState<LatLng>()
  const [isLocating, setIsLocating] = useState(false)

  const map = useMapEvents({
    locationfound: (e) => {
      setUserLocation(e.latlng)
      setIsLocating(false)
    },
    locationerror: (e) => {
      console.error(e)
      setIsLocating(false)
    },
  })
  useEffect(() => {
    map.stopLocate()
    setIsLocating(true)
    map.locate({
      watch: opts.watch,
      setView: opts.setView,
      enableHighAccuracy: true,
    })
  }, [opts.watch, opts.setView])

  useLayoutEffect(() => {
    let tId
    if (isLocating) tId = toast('מאתר מיקום...', { duration: Infinity })
    else toast.dismiss(tId)
  }, [isLocating])

  return { userLocation, isLocating, map }
}
