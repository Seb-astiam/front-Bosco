import LoginPage from './Components/Login/login'
import Register from './Components/Register/Register'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { FormMascota } from "./components/FormUsuarioMascota/FormMascota"


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/register" element = {<Register/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
