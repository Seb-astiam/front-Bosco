import { useState } from 'react'
import './App.css'
import LoginPage from './Components/Login/login'
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element= {<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
