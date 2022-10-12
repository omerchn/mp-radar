import Box from '@mui/material/Box'
import MuiSpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import AddLocationIcon from '@mui/icons-material/AddLocationAltRounded'

interface Props {
  onStartAdd: () => void
}

export default function SpeedDial({ onStartAdd }: Props) {
  return (
    <Box
      sx={{
        transform: 'translateZ(0px)',
        flexGrow: 1,
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
      }}
    >
      <MuiSpeedDial
        ariaLabel="options"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="סימון"
          icon={<AddLocationIcon />}
          tooltipTitle="הוסף סימון"
          onClick={onStartAdd}
        />
      </MuiSpeedDial>
    </Box>
  )
}
