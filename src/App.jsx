import LoginPage from './Components/Login/login'
import Register from './Components/Register/Register'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FormMascota } from "./Components/FormUsuarioMascota/FormMascota"


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/register" element = {<Register/>}/>
        <Route path="/formMascota" element = {<FormMascota />}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
