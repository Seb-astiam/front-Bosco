import React from 'react';

export const Card = ({card}) => {
  const {ubicación, calificación, precio, estatus, fechasDisponibles } = card;

  return (
    <div className="w-72 h-[300px] bg-white rounded-xl border border-gainsboro p-2.5 flex flex-col items-center justify-between">
      <img
        className="h-48 w-full rounded-xl object-cover"
        src="/chichiua.jpg"
        alt=""
      />
      <div className="text-center flex justify-between gap-[30px]">
        <p className="text-base text-dimgray mb-1">{ubicación}</p> {/* Ubicación */}
        <p className="text-base text-dimgray mb-1">{calificación}</p> {/* Calificación */}
       
      </div>
      <p className="text-sm text-midnightblue font-light mb-2">{fechasDisponibles}</p> {/* Fechas Disponibles */}
     
      <div className="text-center flex justify-between gap-[30px]">
        <p className="text-base text-dimgray mb-1">{precio}</p> {/* Precio */}
        <p className="text-base text-green-600 mb-1">{estatus}</p> {/* Estatus */}
        
      </div>
    </div>
  );
};
