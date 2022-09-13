import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import MapPage from './pages/map_page'

// styles
import './App.scss'

function App() {
  return (
    <div className="App" data-testid="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
