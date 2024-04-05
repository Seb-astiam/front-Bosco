import { NavLink } from "react-router-dom";
import Isologotipo from "../../assets/IsoLogotipoBosco.png";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

export const Nav = ({ pathname }) => {
  const navigate = useNavigate();

  const nameUsuario = JSON.parse(localStorage.getItem("user"));

 

  return (
    
    <div className="shadow-lg bg-orange-300 mt-[10px] ml-[10px] mr-[10px] rounded-lg flex flex-row items-center justify-center bg-opacity-80 box-border max-w-full text-left text-mini-8 text-midnightblue font-inter  mq1300:box-border ">
      <div className=" flex flex-row items-center justify-center">
        <div
          className="flex flex-col items-center justify-center   text-black hover:cursor-pointer"
          onClick={() => {
            if (pathname !== "/") navigate("/");
          }}
        >
           <div className="relative leading-[10px] z-[3]">
            <img
              className="max-h-[80px] flex-1 py-1 ml-[20px] mr-[100px] relative rounded-xl max-w-full overflow-hidden object-cover "
              loading="lazy"
              alt=""
              src={Isologotipo}
            />
          </div>
        </div>
        
        <div className=" flex flex-row items-start justify-end gap-[0px_101.9px] text-lg mq450:gap-[0px_25px] mq900:w-[354.9px] mq900:gap-[0px_51px] ">
          <nav className="m-3 h-[42.1px] flex-1 flex flex-row items-center justify-center text-left text-mini-8 text-midnightblue font-inter mq1300:hidden">
           
        

          <div className=" flex flex-row items-start justify-start gap-[0px_29.8px] mq900:hidden">
            <button className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]">
              <NavLink
                to="/ProfileHousing"
                className="cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center"
              >
                Añadir Alojamiento
              </NavLink>
            </button>

            <button className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start mr-[25px] whitespace-nowrap z-[3] hover:bg-[#d14d12]">
              <NavLink
                to="/formMascota"
                className="cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center"
              >
                Añadir Perfil de Mascota
              </NavLink>
            </button>
          </div>

          <div className=" flex flex-row items-center justify-start gap-[0px_29.8px] ">
           

          
          </div>

          <div className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start mr-[25px] whitespace-nowrap z-[3] hover:bg-[#d14d12]">
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
          

          
          
          <div className="ml-[100px] flex items-center justify-center gap-1">
            <h1>{nameUsuario?.name}</h1>
            <DropDown/>
          </div>
           
          </nav>

         

        </div>
      </div>
    </div>
  );
};
