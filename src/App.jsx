import { useState } from 'react'
import './App.css'
import LoginPage from './Components/Login/login'
import Register from './Components/Register/Register'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Pruebas from './Components/Pruebas/Pruebas'

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/register" element = {<Register/>}/>
        <Route path="/pruebas" element = {<Pruebas></Pruebas>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
