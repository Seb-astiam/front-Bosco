

import LoginPage from "./components/Login/login"
import Register from './components/Register/Register'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/register" element = {<Register/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
