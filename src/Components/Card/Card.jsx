import React from 'react';

export const Card = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 mx-auto max-w-full text-11xl">
    <div className="flex flex-row items-center justify-between py-0 px-10 box-border w-full">
    <div className="flex items-center gap-5"> {/* Alineamos los elementos en el centro vertical */}
      <h1 className="text-2xl font-bold leading-normal">Hospedajes</h1>
    </div>
    <div> {/* Este div actuará como un espacio para empujar el botón a la derecha */}
      <button className="pt-5 pb-5 pr-7 pl-8 bg-chocolate-100 rounded-xl hover:bg-chocolate-200 text-white font-medium">Más</button>
    </div>
  </div>
      {/* Contenedor de Tarjetas */}
      <div className="flex overflow-x-auto gap-8">
        {/* Tarjeta */}
        <div className="w-72 bg-white rounded-xl border border-gainsboro p-2.5 flex flex-col items-start gap-2">
          <img
            className="h-48 w-full rounded-xl object-cover"
            src="/chichiua.jpg"
            alt=""
          />
          <div className="px-2.5 text-base text-dimgray">
            dirección
          </div>
          <div className="px-5 text-midnightblue font-medium">
            detalle
          </div>
          <div className="px-2.5 pt-4 pb-2 text-sandybrown border-t border-gainsboro">
            4.8 (243) - Disponible / sin Disponible - $189.25
          </div>
        </div>

        <div className="w-72 bg-white rounded-xl border border-gainsboro p-2.5 flex flex-col items-start gap-2">
          <img
            className="h-48 w-full rounded-xl object-cover"
            src="/chichiua.jpg"
            alt=""
          />
          <div className="px-2.5 text-base text-dimgray">
            dirección
          </div>
          <div className="px-5 text-midnightblue font-medium">
            detalle
          </div>
          <div className="px-2.5 pt-4 pb-2 text-sandybrown border-t border-gainsboro">
            4.8 (243) - Disponible / sin Disponible - $189.25
          </div>
        </div>

        <div className="w-72 bg-white rounded-xl border border-gainsboro p-2.5 flex flex-col items-start gap-2">
          <img
            className="h-48 w-full rounded-xl object-cover"
            src="/chichiua.jpg"
            alt=""
          />
          <div className="px-2.5 text-base text-dimgray">
            dirección
          </div>
          <div className="px-5 text-midnightblue font-medium">
            detalle
          </div>
          <div className="px-2.5 pt-4 pb-2 text-sandybrown border-t border-gainsboro">
            4.8 (243) - Disponible / sin Disponible - $189.25
          </div>
        </div>

        <div className="w-72 bg-white rounded-xl border border-gainsboro p-2.5 flex flex-col items-start gap-2">
          <img
            className="h-48 w-full rounded-xl object-cover"
            src="/chichiua.jpg"
            alt=""
          />
          <div className="px-2.5 text-base text-dimgray">
            dirección
          </div>
          <div className="px-5 text-midnightblue font-medium">
            detalle
          </div>
          <div className="px-2.5 pt-4 pb-2 text-sandybrown border-t border-gainsboro">
            4.8 (243) - Disponible / sin Disponible - $189.25
          </div>
        </div>
        
      </div>
    </div>
  );
};
