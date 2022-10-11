import { useRef, useState } from 'react'
import { Icon, Marker as MarkerType } from 'leaflet'
import { Marker } from 'react-leaflet'

// components
import SpeedDial from '@/components/SpeedDial'

// images
import mpAddImg from '@/assets/images/mp-marker-add.svg'

const mpIcon = new Icon({
  iconUrl: mpAddImg,
  iconSize: [25, 50],
  iconAnchor: [12.5, 50],
})

export default function Overlay() {
  const markerRef = useRef<MarkerType>(null)
  const [isMarking, setIsMarking] = useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1000,
      }}
    >
      <SpeedDial
        onAction={() => {
          setIsMarking(true)
        }}
      />
    </div>
  )
}
