import React from "react";
import { NavLink } from "react-router-dom";
import Isologotipo from "../../assets/IsoLogotipoBosco.png";

export const Navbar = () => {
  return (
    <div className="w-full flex flex-row items-start justify-start pt-0 px-20 pb-[53.30000000000001px] box-border max-w-full text-left text-mini-8 text-midnightblue font-inter mq1300:pl-10 mq1300:pr-10 mq1300:box-border">
      <div className="flex-1 flex flex-row items-end justify-between gap-[45px] max-w-full">
        <div className="flex flex-col items-start justify-start pt-1 px-8  text-black">
          <div className="relative leading-[10px] z-[3]">
            <img
              className="h-[60px] flex-1 py-1 relative rounded-xl max-w-full overflow-hidden object-cover"
              loading="lazy"
              alt=""
              src={Isologotipo}
            />
          </div>
        </div>

        <div className="w-[519.5px] flex flex-row items-start justify-start gap-[0px_101.9px] max-w-full text-mini-5 mq450:gap-[0px_25px] mq900:w-[354.9px] mq900:gap-[0px_51px]">
          <nav className="m-0 h-[42.1px] flex-1 flex flex-row items-start justify-start text-left text-mini-8 text-midnightblue font-inter">
            <div className="self-stretch w-[127.4px] rounded-181xl flex flex-col items-start justify-start pt-[11.100000000000025px] pb-[10.999999999999972px] pr-[7.5px] pl-[49.89999999999998px] box-border z-[4] ml-[-24px] text-mini-9">
              <NavLink
                className="flex-1 relative leading-[20px] no-underline"
                to="/RegisterCompany"
              >
                Empresas
              </NavLink>
            </div>

            <div className="self-stretch w-[127.4px] rounded-181xl flex flex-col items-start justify-start pt-[11.100000000000025px] pb-[10.999999999999972px] pr-[7.5px] pl-[49.89999999999998px] box-border z-[4] ml-[-24px] text-mini-9">
              <NavLink className="flex-1 relative leading-[20px] no-underline">
                Contacto
              </NavLink>
            </div>
          </nav>

          <div className="w-[164.6px] flex flex-row items-start justify-start gap-[0px_29.8px] mq900:hidden">
            <button className="flex flex-col items-start justify-start pt-[7.899999999999977px] px-0 pb-0">
              <NavLink
                to="/Register"
                className="cursor-pointer relative leading-[28.13px] whitespace-nowrap z-[3] no-underline"
              >
                Sign up
              </NavLink>
            </button>

            <button className="cursor-pointer [border:none] py-3 pr-[20.799999999999955px] pl-[21px] bg-chocolate-100 flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-chocolate-200">
              <NavLink
                to="/login"
                className="cursor-pointer no-underline flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center"
              >
                Log In
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
