// React Routers
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Styles
import './assets/css/App.css'

// Components
import Main from './pages/main'

// App Component
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App