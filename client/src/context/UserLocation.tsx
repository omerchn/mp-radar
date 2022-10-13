import { createContext, useState, useContext, useEffect } from 'react'
import { type LatLng } from 'leaflet'
import { useMapEvents } from 'react-leaflet'

// queries
import { useMps } from '@/lib/trpc'

// custom hooks
import useInterval from '@/hooks/useInterval'

// utils
import getClosestMp from '@/utils/getClosestMp'

interface IUserLocationContext {
  userLocation: LatLng | undefined
  isUserLocated: boolean
  closestMpId: string | undefined
}

export const UserLocationContext = createContext<IUserLocationContext>({
  userLocation: undefined,
  isUserLocated: false,
  closestMpId: undefined,
})

interface Props {
  children: React.ReactNode
}

export function UserLocationProvider({ children }: Props) {
  const { data: mps } = useMps()
  const [userLocation, setUserLocation] = useState<LatLng>()
  const [isUserLocated, setIsLocated] = useState<boolean>(false)
  const [closestMpId, setClosestMpId] = useState<string>()

  const map = useMapEvents({
    locationfound: (e) => {
      setUserLocation(e.latlng)
      if (!isUserLocated) setIsLocated(true)
    },
  })

  useInterval(() => {
    map.locate({ enableHighAccuracy: true })
  }, 1000)

  useEffect(() => {
    if (userLocation && mps) {
      setClosestMpId(getClosestMp(userLocation, mps)?._id.toString())
    }
  }, [userLocation, mps])

  return (
    <UserLocationContext.Provider
      value={{ userLocation, isUserLocated, closestMpId }}
    >
      {children}
    </UserLocationContext.Provider>
  )
}

export function useUserLocation() {
  return useContext(UserLocationContext)
}
