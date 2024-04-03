import HousingForm from "./Components/Register/ProfileHousing/HousingForm.jsx";
import RegisterCompany from "./Components/Register/Company/RegisterCompany.jsx";
import Detail from "./Components/Detail/Detail.jsx";
import LoginPage from "./Components/Register/Login/login.jsx";
import { Register } from "./Components/Register/Sign Up/Register.jsx";
import { Route, Routes } from "react-router-dom";
import { FormMascota } from "./Components/FormUsuarioMascota/FormMascota.jsx";

import Home from "./pages/Home/Home";
import PrincipalPage from "./pages/PrincipalPage/PrincipalPage";
import { Terms } from "./Components/Terms/Terms.jsx";
import { Declaration } from "./Components/Declaration/declaration.jsx";
import { Nav } from "./pages/PrincipalPage/Nav.jsx";
import { useLocation } from "react-router-dom";
import { FormReserva } from "./Components/Register/formReserva/formReserva.jsx";
import { HistorialReserva } from "./Components/HistorialReserva/HistorialReserva.jsx";
import { SolicitudReserva } from "./Components/SolicitudReserva/SolicitudReserva.jsx";
import ActivateAccount from "./Components/Register/ActivateAccount/ActivateAccount.jsx";
import { DetalleMascota } from "./pages/DetalleMascota/DetalleMascota.jsx";

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/" && <Nav pathname={pathname} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Principal" element={<PrincipalPage />} />
        <Route path="/ProfileHousing" element={<HousingForm />} />
        <Route path="/RegisterCompany" element={<RegisterCompany />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile/:id/*" element={<Profile />} />
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
