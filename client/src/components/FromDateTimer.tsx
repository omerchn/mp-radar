import { useEffect, useRef, useState } from 'react'

// components
import CircularProgress from '@mui/material/CircularProgress'

// defaults
import { maxMpLifeSeconds } from '@/utils/defaults'

// styles
import './FromDateTimer.scss'

interface Props {
  date: Date
  text: string
}

export default function FromDateTimer({ date, text }: Props) {
  const inter = useRef<NodeJS.Timer>()
  const [timer, setTimer] = useState<string>()
  const [progress, setProgress] = useState<number>()

  useEffect(() => {
    if (inter.current) return
    calcTimer()
    calcProgress()
    inter.current = setInterval(() => {
      calcTimer()
      calcProgress()
    }, 1000)
  }, [])

  const calcTimer = () => {
    const secondsFromDate = (Date.now() - date.getTime()) / 1000
    setTimer(formatTimer(secondsFromDate))
  }

  const calcProgress = () => {
    const secondsFromDate = (Date.now() - date.getTime()) / 1000
    setProgress(((maxMpLifeSeconds - secondsFromDate) / maxMpLifeSeconds) * 100)
  }

  return (
    <div className="from-date-timer">
      <CircularProgress variant="determinate" value={progress} size="5em" />
      <div className="timer">
        <span>{text}</span>
        {timer}
      </div>
    </div>
  )
}

function formatTimer(s: any) {
  var m: any = Math.floor(s / 60)
  m = m >= 10 ? m : '0' + m
  s = Math.floor(s % 60)
  s = s >= 10 ? s : '0' + s
  return m + ':' + s
}
