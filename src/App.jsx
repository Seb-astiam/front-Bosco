import HousingForm from './components/Register/ProfileHousing/HousingForm'
import RegisterCompany from './components/Register/Company/RegisterCompany'
import Detail from './components/Detail/Detail'
import LoginPage from './components/Login/login'
import Register from './components/Register/Register'
import { Route, Routes } from "react-router-dom"
import { FormMascota } from "./components/FormUsuarioMascota/FormMascota"

import Home from './pages/Home'


const App = () => {
  return (
    <>
    
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/ProfileHousing" element={<HousingForm/>} />
        <Route path="/RegisterCompany" element={<RegisterCompany/>} />
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/register" element = {<Register/>}/>
        <Route path="/formMascota" element = {<FormMascota />}/>
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
   
  </>
  )
}
export default App
