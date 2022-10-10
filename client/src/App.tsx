import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import MapPage from './pages/map_page'

// styles
import './App.scss'

import { TrpcProvider } from './lib/trpc'

function App() {
  return (
    <div className="App">
      <TrpcProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MapPage />} />
          </Routes>
        </BrowserRouter>
      </TrpcProvider>
    </div>
  )
}

export default App
