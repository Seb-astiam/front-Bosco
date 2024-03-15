import CardsData from "/CardsPrueba.json"
import { Card } from "../Card/Card"

import React from 'react'


export const Cards = () => {

    let alojamiento= CardsData.slice(0, 3);

    return (
      <div className="mt-[70px] flex-col items-center justify-center gap-10 mx-auto max-w-full text-11xl">
        <div className="flex flex-row items-center justify-between py-0 px-10 box-border w-full">
          <div className="flex items-center gap-5">
            <h1 className="text-2xl font-bold leading-normal">Hospedajes</h1>
          </div>
          <div>
            <button className=" z-10 pt-5 pb-5 pr-7 pl-8 bg-chocolate-100 rounded-xl hover:bg-chocolate-200 text-white font-medium">Más</button>
          </div>
        </div>
  
        <div className="flex flex-wrap justify-center"> {/* Contenedor de las tarjetas con disposición horizontal */}
          {alojamiento.map((card) => (
            <div className="flex flex-wrap" key={card.id}> {/* Contenedor para cada tarjeta */}
              <Card card={card} />
            </div>
          ))}
        </div>
      </div>
    );
  };