import { type LatLng } from 'leaflet'

// interfaces
import { MpDataI } from '@/interfaces'

export default function getClosestMp(
  userLocation: LatLng,
  mps: Array<MpDataI>
): MpDataI | undefined {
  let closestDistance: number = Infinity
  let closestMp: MpDataI | undefined = undefined

  mps.forEach((mp) => {
    const distance = userLocation.distanceTo(mp.position)
    if (distance < closestDistance) {
      closestDistance = distance
      closestMp = mp
    }
  })

  return closestMp
}
