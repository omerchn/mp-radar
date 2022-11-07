import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

// preload images
import { preloadImage } from './utils/preloadImage'
import mpIconImg from '@/assets/images/mp-marker.svg'
import userIconImg from '@/assets/images/user-marker.svg'
preloadImage(mpIconImg)
preloadImage(userIconImg)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
