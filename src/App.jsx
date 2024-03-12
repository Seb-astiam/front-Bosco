import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import login from './Components/Login/login'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<login />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
