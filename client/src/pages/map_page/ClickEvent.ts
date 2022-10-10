import { useMapEvents } from 'react-leaflet'

// mutations
import { useAddMp } from '@/lib/trpc'

export default function ClickEvent() {
  const { mutate: addMp } = useAddMp()

  useMapEvents({
    click: (data) => {
      addMp({
        dateSeen: new Date(),
        position: [data.latlng.lat, data.latlng.lng],
      })
    },
  })

  return null
}
