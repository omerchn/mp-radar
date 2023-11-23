import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// api
import { TrpcProvider } from './lib/trpc'

// pages
import MapPage from './pages/map_page'

// styles
import './App.scss'

export default function App() {
  return (
    <div className="App">
      <TrpcProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MapPage />} />
          </Routes>
        </BrowserRouter>
      </TrpcProvider>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: '2em',
            boxShadow:
              '0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.2)',
          },
        }}
      />
    </div>
  )
}
