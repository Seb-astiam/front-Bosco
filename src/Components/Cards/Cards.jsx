import CardsData from "/CardsPrueba.json"
import { Card } from "../Card/Card"
import { Link } from "react-router-dom";

import React from 'react'


export const Cards = () => {
  let alojamiento = CardsData.slice(0, 4); // Mostrar cuatro tarjetas
  const containerRef = React.useRef(null);

  // Calcular el ancho de cada tarjeta
  const calculateCardWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const numCards = alojamiento.length;
      return `${containerWidth / numCards}px`;
    }
    return 'auto';
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 mx-auto max-w-full text-11xl relative" style={{ marginTop: '-125px' }}> {/* Agregamos relative */}
      <div className="flex flex-row items-center justify-between py-0 px-10 box-border w-full">
        <div className="flex items-center gap-5">
          <h1 className="text-2xl font-bold leading-normal">Hospedajes</h1>
        </div>
        <div>
          <button className="z-10 pt-5 pb-5 pr-7 pl-8 bg-chocolate-100 rounded-xl hover:bg-chocolate-200 text-white font-medium">
            Más
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-8" style={{ marginTop: '-50px' }}>
        {alojamiento.map((card) => (
          <Link key={card.id} to={`/detail/${card.id}`} className="bg-white rounded-lg border border-gray-300 mx-2">
            <Card card={card} />
          </Link>
        ))}
      </div>
    </div>
  );
};