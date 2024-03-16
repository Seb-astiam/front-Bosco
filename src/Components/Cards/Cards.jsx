import CardsData from "/CardsPrueba.json"
import { Card } from "../Card/Card.jsx"

import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';


export const Cards = ({ data }) => {

  const location = useLocation()

  console.log(location.pathname)

    let alojamiento= CardsData.slice(0, 3);

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