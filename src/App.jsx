import HousingForm from "./Components/Register/ProfileHousing/HousingForm.jsx";
import RegisterCompany from "./Components/Register/Company/RegisterCompany.jsx";
import Detail from "./Components/Detail/Detail.jsx";
import LoginPage from "./Components/Register/Login/login.jsx";
import { Register } from "./Components/Register/Sign Up/Register.jsx";
import { Route, Routes, Navigate } from "react-router-dom";
import { FormMascota } from "./Components/FormUsuarioMascota/FormMascota.jsx";

import Home from "./pages/Home/Home";
import PrincipalPage from "./pages/PrincipalPage/PrincipalPage";
import { Terms } from "./Components/Terms/Terms.jsx";
import { Declaration } from "./Components/Declaration/declaration.jsx";
import { Nav } from "./pages/PrincipalPage/Nav.jsx";
import { useLocation } from "react-router-dom";
import { Profile } from "./Components/Profile/Profile.jsx";
import { FormReserva } from "./Components/Register/formReserva/formReserva.jsx";
import { HistorialReserva } from "./Components/HistorialReserva/HistorialReserva.jsx";
import { SolicitudReserva } from "./Components/SolicitudReserva/SolicitudReserva.jsx";
import ActivateAccount from "./Components/Register/ActivateAccount/ActivateAccount.jsx";
import { DetalleMascota } from "./pages/DetalleMascota/DetalleMascota.jsx";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { NotFound } from "./Components/404 NotFound/notFound.jsx";


import Swal from 'sweetalert2'
import PagoAprobado from "./pages/pagos/pagoAprobado.jsx";
import PagoRechazado from "./pages/pagos/pagoRechazado.jsx";
import PagoPendiente from "./pages/pagos/pagoPendiente.jsx";
import { useServices } from "./Hooks/useServices.jsx";



const App = () => {
  useServices();
  const { pathname } = useLocation();
  // const socket = io.connect("http://localhost:3001");
  const socket = io.connect("https://back-bosco.up.railway.app");

  const [notificacion, setNotificacion] = useState('')

  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.on("notificacion", receiveMessage);

    if(userData?.email) socket.emit("join_room", userData.email);

    return () => {
      socket.off("notificacion", receiveMessage);
    };
  }, [socket]);
  
  const receiveMessage = (mensaje) => {

    let timerInterval;
    Swal.fire({
      title: "Aceptado",
      html: mensaje,
      timer: 2000,
      toast: true,
      position: 'top-right',
      width: '400px',
      height: '400px',
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };


        

  return (
    <>
    <span>{notificacion}</span>
      {pathname !== "/" && <Nav pathname={pathname} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Principal" element={<PrincipalPage />} />
        <Route path="/ProfileHousing" element={userData ? <HousingForm /> : <Navigate to="/login" replace />} />
        <Route path="/RegisterCompany" element={<RegisterCompany />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile/*" element={userData ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/formMascota" element={userData ? <FormMascota /> : <Navigate to="/login" replace />} />
        <Route path="/detail/:id" element={userData ? <Detail /> : <Navigate to="/login" replace />} />
        <Route path="/terms" element={<Terms></Terms>} />
        <Route path="/declaration" element={<Declaration></Declaration>} />
        <Route path="/formReserva" element={<FormReserva />} />
        <Route path="/historial-reservas" element={userData ? <HistorialReserva /> : <Navigate to="/login" replace />} />
        <Route path="/solicitud-reserva" element={userData ? <SolicitudReserva /> : <Navigate to="/login" replace />} />
        <Route path="/activate-account" element={<ActivateAccount />} />
        <Route path="/detail-mascota/:id" element={<DetalleMascota />} />
        <Route path="/success" element={<PagoAprobado />} />
        <Route path="/failure" element={<PagoRechazado />} />
        <Route path="/pending" element={<PagoPendiente />} />
        <Route path="*" element={<Navigate to="/404"/> } />
        <Route path="/404" element={<NotFound />} />

      </Routes>
    </>
  );
};
export default App;
