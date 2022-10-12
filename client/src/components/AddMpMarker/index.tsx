import { useEffect, useRef, useMemo, MouseEvent } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import { Icon, LatLng, Marker as MarkerType } from 'leaflet'

// components
import IconButton from '@mui/material/IconButton'

// images
import AddMpImg from '@/assets/images/mp-marker-add.svg'
import DoneIcon from '@mui/icons-material/DoneRounded'
import CancelIcon from '@mui/icons-material/CloseRounded'

// styles
import './index.scss'

const addMpIcon = new Icon({
  iconUrl: AddMpImg,
  iconSize: [30, 60],
  iconAnchor: [15, 60],
})

interface Props {
  onDone: (location: LatLng) => void
  onCancel: () => void
}

export default function AddMpMarker({ onDone, onCancel }: Props) {
  const markerRef = useRef<MarkerType>(null)
  const map = useMap()

  useEffect(() => {
    openPopup()
  }, [markerRef.current])

  const openPopup = () => {
    markerRef.current?.openPopup()
  }

  const handleDone = () => {
    const location = markerRef.current?.getLatLng()
    if (!location) return
    onDone(location)
  }

  const handleCancel = (e: MouseEvent) => {
    e.stopPropagation()
    onCancel()
  }

  const location = useMemo(() => {
    return map.getCenter()
  }, [map])

  return (
    <div className="add-marker">
      <Marker
        position={location}
        icon={addMpIcon}
        ref={markerRef}
        title="הוסף מלשין"
        draggable
        zIndexOffset={1000}
        eventHandlers={{
          dragend: openPopup,
          click: openPopup,
        }}
      >
        <Popup
          closeButton={false}
          offset={[0, -45]}
          autoPan
          keepInView
          autoClose={false}
          closeOnClick={false}
          closeOnEscapeKey={false}
          className="add-popup"
        >
          <div className="controls">
            <IconButton
              title="בטל"
              size="small"
              className="control cancel"
              color="error"
              onClick={handleCancel}
            >
              <CancelIcon />
            </IconButton>
            <IconButton
              title="הוסף"
              size="small"
              className="control done"
              color="success"
              onClick={handleDone}
            >
              <DoneIcon />
            </IconButton>
          </div>
        </Popup>
      </Marker>
    </div>
  )
}
