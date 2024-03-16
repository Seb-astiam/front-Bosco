import HousingForm from './Components/Register/ProfileHousing/HousingForm'
import RegisterCompany from './Components/Register/Company/RegisterCompany'

import LoginPage from './Components/Register/Login/login'
import Register from './Components/Register/Sign Up/Register'
import { Route, Routes } from "react-router-dom"
import { FormMascota } from "./Components/FormUsuarioMascota/FormMascota"

import Home from './pages/Home/Home'
import PrincipalPage from './pages/PrincipalPage/PrincipalPage'


const App = () => {
  return (
    <>
    
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/Principal" element= {<PrincipalPage />} />
        <Route path="/ProfileHousing" element={<HousingForm/>} />
        <Route path="/RegisterCompany" element={<RegisterCompany/>} />
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/Register" element = {<Register/>}/>
        <Route path="/formMascota" element = {<FormMascota />}/>
      </Routes>
   
  </>
  )
}
export default App
