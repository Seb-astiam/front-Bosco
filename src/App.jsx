import { useState } from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import HousingForm from './Components/Register/ProfileHousing/HousingForm'
import RegisterCompany from './Components/Register/Company/RegisterCompany'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    
      <Routes>
        <Route path="/ProfileHousing" element={<HousingForm/>} />
        <Route path="/RegisterCompany" element={<RegisterCompany/>} />
      </Routes>
   
  </>
  )
}

export default App
