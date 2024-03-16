import React from 'react';

export const Card = ({card}) => {
  const {ubicación, calificación, precio, estatus, fechasDisponibles } = card;

  return (
    <div className="w-72 h-[300px] bg-white rounded-xl border border-gainsboro p-2.5 flex flex-col justify-between mt-8"> {/* Ajustamos el margen superior */}
      <img
        className="h-30 w-full rounded-xl object-cover"
        src="/chichiua.jpg"
        alt=""
      />
      <div className="mt-4 text-center flex justify-between gap-4"> {/* Ajustamos el margen superior y el espacio entre los elementos */}
        <p className="text-base text-dimgray">{ubicación}</p> {/* Ubicación */}
        <p className="text-base text-dimgray">{calificación}</p> {/* Calificación */}
      </div>
      <p className="text-sm text-midnightblue font-light mt-2">{fechasDisponibles}</p> {/* Fechas Disponibles */}
      <div className="text-center flex justify-between gap-4"> {/* Ajustamos el espacio entre los elementos */}
        <p className="text-base text-dimgray">{precio}</p> {/* Precio */}
        <p className="text-base text-green-600">{estatus}</p> {/* Estatus */}
      </div>
    </div>
  );
};