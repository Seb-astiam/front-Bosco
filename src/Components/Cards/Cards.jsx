import CardsData from "/CardsPrueba.json"
import { Card } from "../Card/Card"
import { Link } from "react-router-dom";

import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';


export const Cards = ({ data }) => {

  const location = useLocation()

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

    if (data && data.length > 3) {
      alojamiento = data;
    }


    const landing = () => {
      if (location.pathname !== "/Principal") {
        return <div className="flex flex-row items-center justify-between py-0 px-10 box-border w-full">
            <div className="flex items-center gap-5">
              <h1 className="text-2xl font-bold leading-normal">Hospedajes</h1>
            </div>
            <div>
              <NavLink to="/Principal" >
                <button className="pt-5 pb-5 pr-7 pl-8 bg-chocolate-100 rounded-xl hover:bg-chocolate-200 text-white font-medium cursor-pointer">Más</button>
              </NavLink>
            </div>
          </div>
      }
    }



    return (
      <div className="mt-[70px] flex-col items-center justify-center gap-10 mx-auto max-w-full text-11xl">
        {landing()}
  
        <div className="flex justify-center mt-8" style={{ marginTop: '-50px' }}>
          {alojamiento.map((card) => (
            <Link key={card.id} to={`/detail/${card.id}`} className="bg-white rounded-lg border border-gray-300 mx-2">
              <Card card={card} />
            </Link>
          ))}
        </div>
      </div>
    );
  }