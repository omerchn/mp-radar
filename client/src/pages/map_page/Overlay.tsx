// components
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'

// icons
import AddLocationIcon from '@mui/icons-material/AddLocationAltRounded'
import MenuIcon from '@mui/icons-material/UnfoldMoreRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'

interface Props {
  onStartAdd: () => void
  hideSpeedDial: boolean
}

export default function Overlay({ onStartAdd, hideSpeedDial }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          transform: 'translateZ(0px)',
          flexGrow: 1,
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <SpeedDial
          ariaLabel="options"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
          icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
          hidden={hideSpeedDial}
        >
          <SpeedDialAction
            key="סימון"
            icon={<AddLocationIcon />}
            tooltipTitle="הוסף סימון"
            onClick={onStartAdd}
            tooltipOpen
          />
        </SpeedDial>
      </Box>
    </div>
  )
}
