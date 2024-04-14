
import { CardPrincipal } from '../../pages/PrincipalPage/Cards y Card/CardPrincipal'

import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAlojamientoPrincipal } from "../../Hooks/useAlojamientoPrincipal"
import { useSelector } from "react-redux";


export const Cards = () => {
  useAlojamientoPrincipal();

  const alojamiento = useSelector((state) => state.storage.allAlojamientos)

  let data = alojamiento?.slice(0, 4); 

    return (
      <div className="mt-[70px] flex-col items-center justify-center gap-10 mx-auto max-w-full text-11xl">
        <div className="flex flex-row items-center justify-between py-0 px-10 box-border w-full">
            <div className="flex items-center gap-5">
              <h1 className="text-2xl font-bold leading-normal">Hospedajes</h1>
            </div>
            <div>
              <NavLink to="/Principal" className=''>
                <button className="font-custom pt-5 pb-5 pr-7 pl-8 bg-chocolate-100 rounded-[50px] hover:bg-chocolate-200 text-white font-medium cursor-pointer">Más</button>
              </NavLink>
            </div>
          </div>
  
        <div className="flex  justify-evenly gap-[7px]" >

          
          {data?.map((alojamiento) => (
              <CardPrincipal alojamiento={alojamiento} key={alojamiento.id}/>
          ))}


        </div>
      </div>
    );
  }