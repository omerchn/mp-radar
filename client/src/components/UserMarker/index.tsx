import { useEffect, useRef } from 'react'
import { Marker, useMap } from 'react-leaflet'

// hooks
import useLocateUser from '@/hooks/useLocateUser'

interface Props {
  isDisabled?: boolean
  setView?: boolean
}

export default function UserMarker({ setView, isDisabled }: Props) {
  const map = useMap()
  const hasFlownToUser = useRef(false)
  const { userLocation } = useLocateUser({
    setView,
    watch: true,
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
      title="אני"
      interactive={false}
      zIndexOffset={-1}
      opacity={isDisabled ? 0.5 : 1}
    />
  ) : null
}
