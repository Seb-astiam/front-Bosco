import HousingForm from "./Components/Register/ProfileHousing/HousingForm";
import RegisterCompany from "./Components/Register/Company/RegisterCompany";
import Detail from "./Components/Detail/Detail";
import LoginPage from "./Components/Register/Login/login";
import { Register } from "./Components/Register/Sign Up/Register.jsx";
import { Route, Routes } from "react-router-dom";
import { FormMascota } from "./Components/FormUsuarioMascota/FormMascota";

import Home from "./pages/Home/Home";
import PrincipalPage from "./pages/PrincipalPage/PrincipalPage";
import { Terms } from "./Components/Terms/Terms";
import { Declaration } from "./Components/Declaration/declaration";
import { Nav } from "./pages/PrincipalPage/Nav.jsx";
import { useLocation } from "react-router-dom";
import { FormReserva } from "./Components/Register/formReserva/formReserva.jsx";
import { HistorialReserva } from "./Components/HistorialReserva/HistorialReserva.jsx";
import { SolicitudReserva } from "./Components/SolicitudReserva/SolicitudReserva.jsx";
import ActivateAccount from "./Components/Register/ActivateAccount/ActivateAccount.jsx";
import { DetalleMascota } from "./pages/DetalleMascota/DetalleMascota.jsx";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";


const App = () => {
  const { pathname } = useLocation();
  const socket = io.connect("http://localhost:3001");

  const [notificacion, setNotificacion] = useState('')

  useEffect(() => {
    socket.on("notificacion", receiveMessage);
  
    return () => {
      socket.off("notificacion", receiveMessage);
    };
  }, [socket]);
  
  const receiveMessage = (mensaje) => {
    setNotificacion(mensaje);
  };


  return (
    <>
    <span>{notificacion}</span>
      {pathname !== "/" && <Nav pathname={pathname} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Principal" element={<PrincipalPage />} />
        <Route path="/ProfileHousing" element={<HousingForm />} />
        <Route path="/RegisterCompany" element={<RegisterCompany />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/formMascota" element={<FormMascota />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/terms" element={<Terms></Terms>} />
        <Route path="/declaration" element={<Declaration></Declaration>} />
        <Route path="/formReserva" element={<FormReserva />} />
        <Route path="/historial-reservas" element={<HistorialReserva />} />
        <Route path="/solicitud-reserva" element={<SolicitudReserva />} />
        <Route path="/activate-account" element={<ActivateAccount />} />
        <Route path="/detail-mascota/:id" element={<DetalleMascota />} />
      </Routes>
    </>
  );
};
export default App;
