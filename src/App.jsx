import HousingForm from './Components/Register/ProfileHousing/HousingForm'
import RegisterCompany from './Components/Register/Company/RegisterCompany'

import LoginPage from './Components/Login/login'
import Register from './Components/Register/Register'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FormMascota } from "./Components/FormUsuarioMascota/FormMascota"



const App = () => {
  return (
    <>
    
      <Routes>
        <Route path="/ProfileHousing" element={<HousingForm/>} />
        <Route path="/RegisterCompany" element={<RegisterCompany/>} />
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/register" element = {<Register/>}/>
        <Route path="/formMascota" element = {<FormMascota />}/>
      </Routes>
   
  </>
  )
}

export default App
