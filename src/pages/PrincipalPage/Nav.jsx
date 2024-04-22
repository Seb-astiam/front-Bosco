import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Isologotipo from "../../assets/IsoLogotipoBosco.png";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import DropDown from "./DropDown";
import { TfiAlignRight } from "react-icons/tfi";
import pictureDefault from "../../assets/perfilPicture.webp"
export const Nav = ({ pathname }) => {
  const navigate = useNavigate();
  const nameUsuario = JSON.parse(localStorage.getItem("user"));
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const path = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  let picture = pictureDefault

  if (JSON.parse(localStorage.getItem("user"))) {
    if(JSON.parse(localStorage.getItem("user")).picture) {
      picture = JSON.parse(localStorage.getItem("user")).picture
    }
  }
  return (
    <div className="bg-orange-300 mt-[10px] ml-[10px] mr-[10px] rounded-lg shadow-lg">
      <div className="relative flex h-16 items-center justify-between">
        <div
          className="flex flex-col items-center justify-center   text-black hover:cursor-pointer"
          onClick={() => {
            if (pathname !== "/") navigate("/");
          }}
        >
          <img
            className="h-[80px] ml-[20px] mr-[100px]"
            loading="lazy"
            alt=""
            src={Isologotipo}
          />
        </div>

        {/* Enlaces del menú para resoluciones mayores a 1300px */}
        {!isMobile && (
          <div className="flex gap-6 items-center ">
            {path.pathname !== "/Principal" && (
              <NavLink
                to="/Principal"
                className="w-[160px]   no-underline flex-1 relative text-mini-3 leading-[20px] font-custom font-bold text-white text-center cursor-pointer py-3 pr-[20px] pl-[21px] bg-[#eb662b] rounded-[10px] flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:text-[#eb662b] hover:bg-transparent transition"
              >
                Inicio
              </NavLink>
            )}

            {path.pathname !== "/ProfileHousing" && (
              <NavLink
                to="/ProfileHousing"
                className="w-[160px]   no-underline flex-1 relative text-mini-3 leading-[20px] font-custom font-bold text-white text-center cursor-pointer py-3 pr-[20px] pl-[21px] bg-[#eb662b] rounded-[10px] flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:text-[#eb662b] hover:bg-transparent transition"
              >
                Añadir Alojamiento
              </NavLink>
            )}

            {path.pathname !== "/formMascota" && (
              <NavLink
                to="/formMascota"
                className="w-[160px]  no-underline flex-1 relative text-mini-3 leading-[20px] font-custom font-bold text-white text-center cursor-pointer py-3 pr-[20px] pl-[21px] bg-[#eb662b]  rounded-[10px] flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:text-[#eb662b] hover:bg-transparent transition"
              >
                Registro Mascota
              </NavLink>
            )}

            {path.pathname !== "/historial-reservas" && (
              <NavLink
                to="/historial-reservas"
                className="w-[160px]  no-underline flex-1 relative text-mini-3 leading-[20px] font-custom font-bold text-white text-center cursor-pointer py-3 pr-[20px] pl-[21px] bg-[#eb662b] rounded-[10px] flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:text-[#eb662b] hover:bg-transparent transition"
              >
                Historial Reservas
              </NavLink>
            )}

            {path.pathname !== "/solicitud-reserva" && (
              <NavLink
                to="/solicitud-reserva"
                className="w-[160px]  no-underline flex-1 relative text-mini-3 leading-[20px] font-custom font-bold text-white text-center cursor-pointer py-3 pr-[20px] pl-[21px] bg-[#eb662b]  rounded-[10px] flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:text-[#eb662b] hover:bg-transparent transition"
              >
                Solicitudes
              </NavLink>
            )}
            <div className="ml-3">
              <div className="flex items-center">
                <p className="font-custom font-bold text-[#eb662b] mr-2">
                  {nameUsuario?.name}
                </p>
                <DropDown />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center ">
          {isMobile ? (
            <div className="ml-6 mr-6 bg-orange-300">
              <button className="bg-orange-300 text-white" onClick={toggleMenu}>
                <TfiAlignRight />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex gap-6">
              <NavLink
                to="/ProfileHousing"
                className=" font-custom font-bold text-base"
              >
                Añadir Alojamiento
              </NavLink>
              <NavLink to="/formMascota" className="font-custom font-bold">
                Añadir Perfil de Mascota
              </NavLink>
              <NavLink
                to="/historial-reservas"
                className="font-custom font-bold"
              >
                Historial de Reservas
              </NavLink>
              <NavLink
                to="/solicitud-reserva"
                className="font-custom font-bold"
              >
                Solicitudes
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Menú desplegable */}
      {isMobile && menuOpen && (
        <div className="lg:hidden ">
          <div className="bg-orange-300 rounded-lg flex flex-row items-center mx-1 p-4">
            <NavLink
              to="/ProfileHousing"
              className="bg-orange-300 cursor-pointer no-underline flex-1 relative font-custom font-bold text-mini-3 leading-[20px] text-white text-center block my-2"
            >
              Añadir Alojamiento
            </NavLink>
            <NavLink
              to="/formMascota"
              className="bg-orange-300 cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-custom font-bold text-white text-center block my-2"
            >
              Registrar Mascota
            </NavLink>
            <NavLink
              to="/historial-reservas"
              className="bg-orange-300 cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-custom font-bold text-white text-center block my-2"
            >
              Historial Reservas
            </NavLink>
            <NavLink
              to="/solicitud-reserva"
              className="bg-orange-300 cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-custom font-bold text-white text-center block my-2"
            >
              Solicitudes
            </NavLink>

            <div className="flex items-center">
              <p className="font-custom font-bold text-[#eb662b] mr-2">
                {nameUsuario?.name}
              </p>
              <DropDown />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};