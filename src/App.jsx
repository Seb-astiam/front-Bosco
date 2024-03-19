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
        <Route path="/formMascota" element={<FormMascota />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/terms" element={<Terms></Terms>} />
        <Route path="/declaration" element={<Declaration></Declaration>} />
      </Routes>
    </>
  );
};
export default App;
