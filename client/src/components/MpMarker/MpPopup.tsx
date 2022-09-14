// interfaces
import MpData from '@/interfaces/MpData'

// custom hooks
import useLifeTimer from '@/hooks/useLifeTimer'

// utils
import { maxMpLifeSeconds } from '@/utils/defaults'

// components
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'

// images
import SeenImg from '@/assets/images/seen.svg'
import UnseenImg from '@/assets/images/unseen.svg'

// styles
import './MpPopup.scss'

interface Props {
  mpData: MpData
}

export default function MpPopup({ mpData }: Props) {
  const { timerString, lifePercentage } = useLifeTimer({
    lifeStartDate: mpData.dateLastSeen,
    lifeSpanSeconds: maxMpLifeSeconds,
  })

  return (
    <div className="mp-popup">
      <div className="votes">
        <IconButton size="small" className="vote">
          <img src={UnseenImg} alt="unseen" />
        </IconButton>
        <IconButton size="small" className="vote">
          <img src={SeenImg} alt="seen" />
        </IconButton>
      </div>
      <div className="last-seen">
        <span>
          זמן מאז <br /> נראה לאחרונה
        </span>
        <span className="timer">{timerString}</span>
      </div>
      <LinearProgress
        variant="determinate"
        value={lifePercentage}
        color="error"
      />
      <div
        className={`score ${
          mpData.score > 0 ? 'pos' : mpData.score === 0 ? 'even' : 'neg'
        }`}
      >
        {Math.abs(mpData.score) || '-'}
      </div>
    </div>
  )
}
