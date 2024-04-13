import { NavLink } from "react-router-dom";
import Isologotipo from "../../assets/IsoLogotipoBosco.png";
import { useNavigate } from "react-router-dom";
import pictureDefault from "../../assets/perfilPicture.webp"
export const Nav = ({ pathname }) => {
  const navigate = useNavigate();
  const nameUsuario = JSON.parse(localStorage.getItem("user"));
  let picture = pictureDefault
  if (JSON.parse(localStorage.getItem("user"))) {

    picture = JSON.parse(localStorage.getItem("user")).picture
  }

  return (
    <div className="bg-orange-300 mt-[10px] ml-[10px] mr-[10px] rounded-lg">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-col items-center justify-center   text-black hover:cursor-pointer" onClick={() => { if (pathname !== "/") navigate("/"); }}>
          <img className="h-[80px] ml-[20px] mr-[100px]" loading="lazy" alt="" src={Isologotipo} />
        </div>
        
      

        {/* Enlaces del menú para resoluciones mayores a 1300px */}
      {!isMobile && (
        <div className="flex gap-6 items-center ">
          <NavLink to="/ProfileHousing" className="  no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">Añadir Alojamiento</NavLink>
          <NavLink to="/formMascota" className=" no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b]  rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">Añadir Perfil de Mascota</NavLink>
          <NavLink to="/historial-reservas" className=" no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">Historial de Reservas</NavLink>
          <NavLink to="/solicitud-reserva" className=" no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-cente cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b]  rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">Solicitudes</NavLink>
          <div className="ml-3">
            
          <div className="flex items-center">
            <h1 className="text-white">{nameUsuario?.name}</h1>
            <DropDown />

          </div>
        </div>
        {nameUsuario?.email && (
          <h2 className="font-mono text-mini-9 text-red-600">
            Email: {nameUsuario.email}
          </h2>
        )}
        <div className=" flex flex-row items-start justify-end gap-[0px_101.9px] text-lg mq450:gap-[0px_25px] mq900:w-[354.9px] mq900:gap-[0px_51px] ">
          <nav className="m-0 h-[42.1px] flex-1 flex flex-row items-start justify-start text-left text-mini-8 text-midnightblue font-inter mq1300:hidden">
            <div className="self-stretch w-[127.4px] rounded-181xl flex flex-col items-start justify-start pt-[11.100000000000025px] pb-[10.999999999999972px] pr-[7.5px] pl-[49.89999999999998px] box-border z-[4] ml-[-24px] text-mini-9">
              <NavLink
                className="flex-1 relative leading-[20px] no-underline text-lg "
                to="/RegisterCompany"
              >
                Empresas
              </NavLink>
            </div>

            <div className="self-stretch w-[127.4px] rounded-181xl flex flex-col items-start justify-start pt-[11.100000000000025px] pb-[10.999999999999972px] pr-[7.5px] pl-[49.89999999999998px] box-border z-[4] ml-[-24px] text-mini-9">
              <NavLink className="flex-1 relative leading-[20px] no-underline text-lg">
                Contacto
              </NavLink>
            </div>
          </nav>

          <div className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">
            <NavLink
              to="/Principal"
              className="cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center"
            >
              Home
            </NavLink>
          </div>

          <div className=" flex flex-row items-start justify-start gap-[0px_29.8px] mq900:hidden">
            <button className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">
              <NavLink
                to="/ProfileHousing"
                className="cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center"
              >
                Añadir Alojamiento
              </NavLink>
            </button>

            <button className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">
              <NavLink
                to="/formMascota"
                className="cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center"
              >
                Añadir Perfil de Mascota
              </NavLink>
            </button>
          </div>

          {nameUsuario?.email ?
            <div>
              <button className="flex flex-col w-[40px] h-[40px] border rounded-md mt-[7.899999999999977px] p-0 items-start justify-start  ">
                <NavLink
                  to="/Profile/perfil"
                  className="cursor-pointer relative p-0 w-[40px] h-[40px] whitespace-nowrap  no-underline"
                >
                  {
                    !picture?
                    <img className="w-full h-full p-0 border rounded-md bg-slate-300 " src="" alt="" />
                    :
                    <img className="w-full h-full p-0 border rounded-md bg-slate-300 " src={picture} alt="" />
                  }
                </NavLink>
              </button>
            </div>
            :
            <div className=" flex flex-row items-center justify-start gap-[0px_29.8px] ">
              <button className="flex flex-col items-start justify-start pt-[7.899999999999977px] px-0 pb-0 bg-[#f7ab5e]">
                <NavLink
                  to="/Register"
                  className="cursor-pointer relative leading-[28.13px] whitespace-nowrap z-[3] no-underline"
                >
                  Registrate
                </NavLink>
              </button>

              <button className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">
                <NavLink
                  to="/login"
                  className="cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center"
                >
                  Log In
                </NavLink>
              </button>
            </div>}

          <div className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">
            <NavLink
              to="/historial-reservas"
              className="cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center"
            >
              Historial de Reservas
            </NavLink>
          </div>

          <div className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">
            <NavLink
              to="/solicitud-reserva"
              className="cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center"
            >
              Solicitudes
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};