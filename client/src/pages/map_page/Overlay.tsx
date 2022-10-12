// components
import SpeedDial from '@/components/SpeedDial'

export default function Overlay({ onStartAdd }: { onStartAdd: () => void }) {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1000,
      }}
    >
      <SpeedDial onStartAdd={onStartAdd} />
    </div>
  )
}
