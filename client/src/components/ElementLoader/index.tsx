import { useEffect } from 'react'
import { createPortal } from 'react-dom'

// components
import LinearProgress from '@mui/material/LinearProgress'

// styles
import './index.scss'

interface Props {
  isLoading: boolean
  element: HTMLElement
  hideElementOnLoad?: boolean
}

export default function ElementLoader({
  isLoading,
  element,
  hideElementOnLoad,
}: Props) {
  useEffect(() => {
    if (!element) return
    element.classList.add('element-loader-parent')
    hideElementOnLoad && element.classList.add('hide-on-load')

    if (isLoading) {
      element.classList.add('loading')
    } else {
      element.classList.remove('loading')
    }

    return () => element && element.classList.remove('loading')
  }, [isLoading, element ? [...element.classList]?.join(' ') : ''])

  if (!element) return null
  return createPortal(
    <div className="element-loader">
      <LinearProgress />
    </div>,
    element
  )
}
