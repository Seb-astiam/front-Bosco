import React from 'react';
import { useParams } from 'react-router-dom';
import CardsData from "/CardsPrueba.json"

const Detail = () => {
    const cardsData = CardsData;
  const { id } = useParams(); // Obtén el ID de la URL
  const card = cardsData.find(card => card.id === parseInt(id)); // Busca la tarjeta correspondiente en los datos

  if (!card) {
    return <div>No se encontró la tarjeta</div>; // Maneja el caso en que no se encuentre la tarjeta
  }

  const { ubicación, calificación, precio, estatus, fechasDisponibles } = card;

  return (

    
    <div className="w-[533px] flex flex-col items-start justify-start gap-[58px] max-w-[calc(100%_-_642px)] shrink-0 text-left text-9xl text-black font-manrope lg:hidden lg:max-w-full mq750:gap-[29px_58px]">
    <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[23px] pl-[33px] box-border max-w-full">
      <div className="flex-1 flex flex-col items-start justify-start gap-[36px] max-w-full mq750:gap-[18px_36px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[47px] max-w-full mq750:gap-[23px_47px]">
          <h1 className="m-0 w-[437px] relative text-inherit font-semibold font-inherit inline-block max-w-full mq450:text-3xl">
            Alojamiento Pablo
          </h1>
          <div className="self-stretch flex flex-col items-start justify-start gap-[49px] text-center text-xl text-indianred mq750:gap-[24px_49px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[11.666666666666666px] mq750:flex-wrap">
              <h2 className="m-0 relative text-inherit tracking-[0.17em] leading-[15px] font-medium font-inherit whitespace-pre-wrap mq450:text-base mq450:leading-[12px]">
              <p>{ubicación}</p>
              </h2>
              <div className="h-[11.5px] flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0 box-border">
                <div className="w-px h-[9px] relative box-border border-r-[1px] border-solid border-silver" />
              </div>
              <div className="h-[15px] flex flex-row items-start justify-start gap-[7px]">
                <img
                  className="h-[15px] w-3.5 relative overflow-hidden shrink-0 object-cover min-h-[15px]"
                  loading="lazy"
                  alt=""
                  src="/9-rating-star@2x.png"
                />
                <img
                  className="h-[15px] w-[15px] relative overflow-hidden shrink-0 object-cover min-h-[15px]"
                  loading="lazy"
                  alt=""
                  src="/9-rating-star-1@2x.png"
                />
                <img
                  className="h-[15px] w-[15px] relative overflow-hidden shrink-0 object-cover min-h-[15px]"
                  loading="lazy"
                  alt=""
                  src="/9-rating-star-1@2x.png"
                />
                <img
                  className="h-[15px] w-[15px] relative overflow-hidden shrink-0 object-cover min-h-[15px]"
                  loading="lazy"
                  alt=""
                  src="/9-rating-star-1@2x.png"
                />
                <img
                  className="h-[15px] w-[15px] relative overflow-hidden shrink-0 object-cover min-h-[15px]"
                  loading="lazy"
                  alt=""
                  src="/9-rating-star-1@2x.png"
                />
              </div>
              <div className="w-[106px] relative text-xs tracking-[0.02em] leading-[15px] font-medium text-transparent !bg-clip-text [background:linear-gradient(122.19deg,_#171c24,_#28313f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[106px]">
              <p >{calificación}</p>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-[23px] mq450:flex-wrap">
              <img
                className="h-[53px] w-[52px] relative rounded-3xs object-cover"
                loading="lazy"
                alt=""
                src="/chichiua.jpg"
              />
              <div className="h-[48.5px] flex flex-col items-start justify-start pt-[4.5px] px-0 pb-0 box-border">
                <img
                  className="w-11 h-11 relative rounded-3xs object-cover"
                  loading="lazy"
                  alt=""
                  src="/chichiua.jpg"
                />
              </div>
              <div className="h-[48.5px] flex flex-col items-start justify-start pt-[4.5px] px-0 pb-0 box-border">
                <img
                  className="w-11 h-11 relative rounded-3xs object-cover"
                  loading="lazy"
                  alt=""
                  src="/chichiua.jpg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[43px] flex flex-col items-start justify-start gap-[16px] text-center text-xs">
          <div className="self-stretch relative tracking-[0.02em] leading-[15px] font-semibold inline-block min-w-[43px]">
            Plazas:
          </div>
          <div className="w-7 flex flex-row items-start justify-start text-left text-white">
            <div className="flex-1 rounded-3xs bg-darkorange flex flex-row items-start justify-start py-2.5 px-2 border-[2px] border-solid border-lavenderblush">
              <b className="relative inline-block min-w-[8px]">2</b>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-[484px] flex flex-row items-start justify-start pt-0 px-[33px] pb-[17px] box-border max-w-full text-center text-xs">
      <div className="flex-1 flex flex-col items-start justify-start gap-[11px] max-w-full">
        <div className="w-[55px] relative tracking-[0.02em] leading-[15px] font-semibold inline-block min-w-[55px]">
          Servicios
        </div>
        <div className="self-stretch h-[91px] relative tracking-[0.02em] leading-[177.99%] font-light text-left inline-block shrink-0">
          <ul className="m-0 font-inherit text-inherit pl-4">
            <li className="mb-0">Paseo Diario</li>
            <li className="mb-0">Baño</li>
            <li className="mb-0">Juegos</li>
            <li>Juegos diarios</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="self-stretch rounded-sm bg-white shadow-[0px_2px_30px_rgba(54,_56,_90,_0.12)] flex flex-row items-start justify-start py-[20.5px] px-5 gap-[83px] text-sm text-dark-grey mq750:gap-[83px_41px] mq1050:flex-wrap">
      <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
        <div className="flex flex-row items-start justify-start gap-[20px] mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start pt-2 px-0 pb-0">
            <div className="relative leading-[24px] font-semibold inline-block min-w-[48px]">
              Plazas:
            </div>
          </div>
          <div className="h-8 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/minussquare.svg"
            />
          </div>
          <div className="w-[39px] rounded-3xs bg-white box-border flex flex-row items-start justify-start py-2.5 px-[13px] text-mini font-bevan border-[2px] border-solid border-light-grey">
            <div className="relative leading-[20px] inline-block min-w-[9px]">
              1
            </div>
          </div>
          <div className="h-8 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/plussquare.svg"
            />
          </div>
        </div>
      </div>
      <button className="cursor-pointer [border:none] py-[13px] px-[47px] bg-naranjaForm rounded-3xs flex flex-row items-start justify-start whitespace-nowrap hover:bg-chocolate-200">
        <b className="relative text-xs inline-block font-manrope text-white text-left min-w-[79px]">
          SOLICITAR
        </b>
      </button>
    </div>
  </div>


/*<div className="flex justify-center">
  {/* División izquierda para el texto con propiedades 
  <div className="w-1/2 p-4">
    <div className="flex flex-col justify-center h-full " style={{ backgroundColor: '#FEEBC8' }}>
      <div>
        <p className="text-base text-dimgray">{ubicación}</p>
        <p className="text-base text-dimgray">{calificación}</p>
      </div>
      <p className="text-sm text-midnightblue font-light mb-2">{fechasDisponibles}</p>
      <div>
        <p className="text-base text-dimgray">{precio}</p>
        <p className="text-base text-green-600">{estatus}</p>
      </div>
    </div>
  </div>
 
  <div className="grow w-full aspect-[0.79] max-md:mt-10 max-md:max-w-full">
    
    <div className="border border-orange-500 rounded-xl p-2">
      <div className="flex justify-between">
        
        <div className="w-1/3 mr-1 overflow-hidden rounded-xl">
          <img
            className="shrink-0 self-stretch border-solid aspect-[0.98] border-[5px] border-indigo-400 border-opacity-10 w-[52px]"
            src="/chichiua.jpg"
            alt=""
          />
        </div>
        <div className="w-1/3 mr-1 overflow-hidden rounded-xl">
          <img
            className="shrink-0 self-stretch border-solid aspect-[0.98] border-[5px] border-indigo-400 border-opacity-10 w-[52px]"
            src="/chichiua.jpg"
            alt=""
          />
        </div>
        <div className="w-1/3 overflow-hidden rounded-xl">
          <img
            className="h-48 w-full object-cover"
            src="/chichiua.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</div>*/



  
  
  
  
  
  
  
  
  
  
  );
};

export default Detail;
