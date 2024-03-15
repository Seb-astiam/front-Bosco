import React from 'react'

export const Navbar = () => {
  return (
    
  <div className="w-[1390px] flex flex-row items-start justify-start pt-0 px-20 pb-[53.30000000000001px] box-border max-w-full text-left text-mini-8 text-midnightblue font-inter mq1300:pl-10 mq1300:pr-10 mq1300:box-border">
    <div className="flex-1 flex flex-row items-end justify-between gap-[45px] max-w-full">
     
      <div className="flex flex-col items-start justify-start pt-1 px-8  text-black">
        
        <div  className="relative leading-[10px] z-[3]">
        <img
              className="h-[50px] flex-1 py-1 relative rounded-xl max-w-full overflow-hidden object-cover"
              loading="lazy"
              alt=""
              src="/1084899-ff5722.png"
            />    
        </div>
        
      </div>

      <div className="w-[519.5px] flex flex-row items-start justify-start gap-[0px_101.9px] max-w-full text-mini-5 mq450:gap-[0px_25px] mq900:w-[354.9px] mq900:gap-[0px_51px]">
        
        <nav className="m-0 h-[42.1px] flex-1 flex flex-row items-start justify-start text-left text-mini-8 text-midnightblue font-inter">
        <div className="self-stretch w-[127.4px] rounded-181xl flex flex-col items-start justify-start pt-[11.100000000000025px] pb-[10.999999999999972px] pr-[7.5px] pl-[49.89999999999998px] box-border z-[4] ml-[-24px] text-mini-9">
          <a className="flex-1 relative leading-[20px] text-decoration-line: none" href="https://google.com" >Empresas</a>
            <div className="self-stretch h-[18px] flex flex-row items-start justify-start py-0 pr-3 pl-[39.60000000000002px] box-border mt-[-19px] text-lg">
            </div>
          </div>

          <div className="self-stretch w-[127.4px] rounded-181xl flex flex-col items-start justify-start pt-[11.100000000000025px] pb-[10.999999999999972px] pr-[7.5px] pl-[49.89999999999998px] box-border z-[4] ml-[-24px] text-mini-9">
          <a className="flex-1 relative leading-[20px] text-decoration-line: none" href="https://google.com" >Contacto</a>
            <div className="self-stretch h-[18px] flex flex-row items-start justify-start py-0 pr-3 pl-[39.60000000000002px] box-border mt-[-19px] text-lg">
            </div>
          </div>
          
        </nav>
        <div className="w-[164.6px] flex flex-row items-start justify-start gap-[0px_29.8px] mq900:hidden">
          <div className="flex flex-col items-start justify-start pt-[7.899999999999977px] px-0 pb-0">
            <div className="relative leading-[28.13px] whitespace-nowrap z-[3]" href="https://google.com">
              Sign up
            </div>
          </div>
          <button className="cursor-pointer [border:none] py-3 pr-[20.799999999999955px] pl-[21px] bg-chocolate-100 flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-chocolate-200">
            <div className="flex-1 relative text-mini-3 leading-[20px] font-medium font-inter text-white text-center">
              Log in
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}