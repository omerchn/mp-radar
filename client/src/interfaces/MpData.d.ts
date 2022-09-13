import { type LatLngExpression } from 'leaflet'

export default interface MpData {
  id: string
  position: LatLngExpression
  dateSeen: Date
  score: number
}