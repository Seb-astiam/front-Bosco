import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Isologotipo from "../../assets/IsoLogotipoBosco.png";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import DropDown from "./DropDown";
import { TfiAlignRight } from "react-icons/tfi";
import { Filtros } from "./Filtro";


export const Nav = ({ pathname }) => {
  const navigate = useNavigate();
  const nameUsuario = JSON.parse(localStorage.getItem("user"));
  const isMobile = useMediaQuery("(max-width: 1200px)");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="bg-orange-300 mt-[10px] px-[10px] rounded-lg">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-col items-center justify-center   text-black hover:cursor-pointer" onClick={() => { if (pathname !== "/") navigate("/"); }}>
          <img className="h-[80px] ml-[20px] mr-[100px]" loading="lazy" alt="" src={Isologotipo} />
        </div>
        
      

        {/* Enlaces del menú para resoluciones mayores a 1300px */}
      {!isMobile && (
        <div className="flex gap-6 items-center ">
          <NavLink to="/ProfileHousing" className=" cursor-pointer no-underline relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">Añadir Alojamiento</NavLink>
          <NavLink to="/formMascota" className="cursor-pointer no-underline relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">Añadir Perfil de Mascota</NavLink>
          <NavLink to="/historial-reservas" className="cursor-pointer no-underline relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">Historial de Reservas</NavLink>
          <NavLink to="/solicitud-reserva" className="cursor-pointer no-underline relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">Solicitudes</NavLink>
          <div className="ml-3">
            
          <div className="flex items-center">
            <h1 className="text-white">{nameUsuario?.name}</h1>
            <DropDown />
          </div>
          
          </div>
          
        </div>
        
        
      )}
      

        <div className="flex items-center ">
          {isMobile ? (
            <div className="ml-6 mr-6 bg-orange-300">
              <button className="bg-orange-300 text-white" onClick={toggleMenu}><TfiAlignRight/></button>
              
            </div>
            
          ) : (
            <div className="hidden lg:flex gap-6">
              <NavLink to="/ProfileHousing" className=" text-white">Añadir Alojamiento</NavLink>
              <NavLink to="/formMascota" className="text-white">Añadir Perfil de Mascota</NavLink>
              <NavLink to="/historial-reservas" className="text-white">Historial de Reservas</NavLink>
              <NavLink to="/solicitud-reserva" className="text-white">Solicitudes</NavLink>
              
            </div>
            

          )}


        </div>
        
      </div>

      {/* Menú desplegable */}
      {isMobile && menuOpen && (
        <div className="lg:hidden ">
          <div className="bg-orange-300 rounded-lg flex flex-row items-center mx-1 p-4">
            <NavLink to="/ProfileHousing" className="bg-orange-300 cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente block my-2">Añadir Alojamiento</NavLink>
            <NavLink to="/formMascota" className="bg-orange-300 cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente block my-2">Añadir Perfil de Mascota</NavLink>
            <NavLink to="/historial-reservas" className="bg-orange-300 cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente block my-2">Historial de Reservas</NavLink>
            <NavLink to="/solicitud-reserva" className="bg-orange-300 cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente block my-2">Solicitudes</NavLink>
            
            <div className="flex items-center">
            <h1 className="text-white">{nameUsuario?.name}</h1>
            <DropDown />
          </div>
        
          </div>
          
        </div>
      )}

      
    </div>
  );
};
