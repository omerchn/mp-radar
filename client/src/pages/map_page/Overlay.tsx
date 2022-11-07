// components
import { Box } from '@mui/material'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import Fab from '@mui/material/Fab'

// icons
import AddLocationIcon from '@mui/icons-material/AddLocationAltRounded'
import MenuIcon from '@mui/icons-material/UnfoldMoreRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import MyLocationIcon from '@mui/icons-material/MyLocationRounded'

interface Props {
  onStartAdd: () => void
  hideSpeedDial: boolean
  followUser: boolean
  setFollowUser: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Overlay({
  onStartAdd,
  hideSpeedDial,
  followUser,
  setFollowUser,
}: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        zIndex: 1000,
        width: '100%',
      }}
    >
      <Box
        sx={{
          transform: 'translateZ(0px)',
          flexGrow: 1,
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
          width: '100%',
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
            tooltipTitle="הוספת סימון"
            onClick={(e) => {
              ;(
                e.currentTarget.querySelector('.MuiFab-root') as
                  | HTMLElement
                  | undefined
              )?.blur()
              onStartAdd()
            }}
            tooltipOpen
          />
        </SpeedDial>
        <Fab
          sx={{
            position: 'absolute',
            bottom: '1em',
            left: '1em',
          }}
          onClick={() => setFollowUser(true)}
        >
          <MyLocationIcon color={followUser ? 'primary' : 'disabled'} />
        </Fab>
      </Box>
    </div>
  )
}
