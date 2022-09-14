import { type LatLngExpression } from 'leaflet'

export default interface UserData {
  id: string
  position: LatLngExpression
}
