import { useEffect, useState } from 'react'

// custom hooks
import useInterval from './useInterval'

interface Props {
  lifeStartDate: Date
  lifeSpanSeconds: number
  onDead?: () => void
}

export default function useLifeTimer({
  lifeStartDate,
  lifeSpanSeconds,
  onDead,
}: Props) {
  const [timerString, setTimerString] = useState('00:00')
  const [lifePercentage, setLifePercentage] = useState(100)

  useInterval(
    () => {
      calcTimer()
      calcLifePercentage()
    },
    1000,
    lifePercentage === 0
  )

  const calcTimer = () => {
    const timeFromStart = Date.now() - lifeStartDate.getTime()
    setTimerString(formatTimerString(timeFromStart / 1000))
  }

  const calcLifePercentage = () => {
    if (lifePercentage === 0) return
    const secondsFromStart = (Date.now() - lifeStartDate.getTime()) / 1000
    const secondsToDeath = lifeSpanSeconds - secondsFromStart

    setLifePercentage(
      Math.max(
        100 - ((lifeSpanSeconds - secondsToDeath) / lifeSpanSeconds) * 100,
        0
      )
    )
  }

  useEffect(() => {
    if (lifePercentage === 0 && onDead) onDead()
  }, [lifePercentage, onDead])

  return {
    timerString,
    lifePercentage,
    isDead: lifePercentage === 0,
  }
}

function formatTimerString(s: any) {
  var m: any = Math.floor(s / 60)
  m = m >= 10 ? m : '0' + m
  s = Math.floor(s % 60)
  s = s >= 10 ? s : '0' + s
  return m + ':' + s
}
