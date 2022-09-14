import { useEffect, useRef } from 'react'

export default function useInterval(
  callback: () => void,
  delay: number,
  isDisabled: boolean = false
) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay !== null) {
      if (!isDisabled) savedCallback.current()
      let id = setInterval(() => {
        if (!isDisabled) savedCallback.current()
        else clearInterval(id)
      }, delay)
      return () => clearInterval(id)
    }
  }, [delay, isDisabled])
}
