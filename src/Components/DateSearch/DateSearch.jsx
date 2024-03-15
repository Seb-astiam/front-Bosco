import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateSearch = () => {
 
  const [fechaSalida, setFechaSalida] = useState(new Date());
  const [fechaRetorno, setFechaRetorno] = useState(new Date());

  
  const enviarFechas = () => {
    
    alert(`Salida: ${fechaSalida.toDateString()}, Retorno: ${fechaRetorno.toDateString()}`);
  };

  return (
    <div className="self-stretch rounded-181xl bg-white shadow-[0px_10px_40px_rgba(0,_0,_0,_0.05)] flex flex-row items-end justify-between pt-[9.699999999999989px] pb-[10.300000000000011px] pr-[9px] pl-5 box-border max-w-full gap-[20px] z-[3] text-xl mq1300:flex-wrap">
      <div className="w-[483.5px] flex flex-col items-start justify-start pt-0 px-0 pb-[4.699999999999989px] box-border max-w-full">
        <div className="self-stretch flex flex-row items-start justify-start gap-[0px_57.9px] mq900:flex-wrap mq900:gap-[0px_29px]">
          {/* Salida */}
          <div className="flex-1 flex flex-row items-start justify-start gap-[0px_10.3px] min-w-[139px] mq450:flex-wrap">  
            <div className="h-[50px] w-[50px] flex-1 relative rounded-xl max-w-full overflow-hidden object-cover ">
            <img
              className="h-[25px] w-[25px] py-3 flex-1 relative rounded-xl max-w-full overflow-hidden object-cover"
              loading="lazy"
              alt=""
              src="/1084899-4caf50.png"
            />    
              {/* Ícono o contenido adicional aquí */}
              
            </div>
            <div className="flex flex-col items-start justify-start pt-[3.1999999999999886px] px-0 pb-0 text-mini-9">
              <div className="relative leading-[24px] font-medium">Salida</div>
              <DatePicker selected={fechaSalida} onChange={setFechaSalida} />
            </div>
          </div>
          {/* Retorno */}
          <div className="flex-1 flex flex-row items-start justify-start gap-[0px_10.3px] min-w-[139px] mq450:flex-wrap">
          <div className="h-[50px] w-[50px] flex-1 relative rounded-xl max-w-full overflow-hidden object-cover ">
            <img
              className="h-[25px] w-[25px] py-3 flex-1 relative rounded-xl max-w-full overflow-hidden object-cover"
              loading="lazy"
              alt=""
              src="/1084899-ff5722.png"
            />    
              {/* Ícono o contenido adicional aquí */}
              
            </div>
            <div className="flex flex-col items-start justify-start pt-[1.6999999999999886px] px-0 pb-0 text-mini-9">
              <div className="relative leading-[24px] font-medium">Retorno</div>
              <DatePicker selected={fechaRetorno} onChange={setFechaRetorno} />
            </div>
          </div>
        </div>
      </div>
     
      <button 
        className="cursor-pointer [border:none] pt-[19px] pb-[21px] pr-7 pl-[30px] bg-chocolate-100 w-[137px] rounded-181xl flex flex-row items-start justify-start box-border hover:bg-chocolate-200" 
        onClick={enviarFechas}  
      >
        <div className="flex-1 relative text-xl leading-[20px] font-medium font-inter text-white text-center mq450:text-base mq450:leading-[22px]"> 
          Buscar 
        </div>
      </button>
    </div>
  );
};
