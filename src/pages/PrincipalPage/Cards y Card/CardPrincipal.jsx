import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const CardPrincipal = ({alojamiento}) => {
    const [indexImage, setIndexImage] = useState(0);
    const [hover, setHover] = useState(false);

    const { accommodationType, datesAvailable, datesEnd, images, location, price, square, title, Services } = alojamiento;
    
    const changeImage = (direccion) => {
        if (direccion === 'anterior') {
            setIndexImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        } else {
            setIndexImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }
      };

    return (
        <div className='flex flex-col items-center  h-[420px] w-[260px] mt-2 bg-white rounded-[15px] shadow  hover:scale-105'>  
            <div className="relative mt-3" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {hover && (
                    <button onClick={() => changeImage("anterior")}
                    className="absolute top-1/2 transform -translate-y-1/2 left-4 rounded-[50%] bg-white bg-opacity-70 hover:bg-white hover:bg-opacity-100 cursor-pointer z-10"
                    > Prev </button>
                )}
                {hover && (
                    <button onClick={() => changeImage("siguiente")}
                    className="absolute top-1/2 transform -translate-y-1/2 right-4 rounded-[50%] bg-white bg-opacity-70 hover:bg-white hover:bg-opacity-100 cursor-pointer z-10"
                    > Next </button>
                )}
                <img className="w-[200px] h-[220px] rounded-lg" src={images[indexImage]} alt={`Imagen ${indexImage + 1}`} />
            </div>

            <div className="mt-[2px] text-start flex w-[250px]">
                <p className="text-base font-custom font-extrabold text-black">{location}, {title}</p>
            </div>

            <div className="text-start flex flex-wrap gap-1 w-[250px] mt-[-20px]">
                <p className="font-custom text-[12px] font-medium text-black text-xs bg-olive rounded-2xl px-2 py-[2px] flex items-center justify-center shadow">
                    {accommodationType}
                </p> 
                    {Services.map((service, index) => {
                        return (
                        <p key={service.id}
                            className={`shadow font-custom text-[12px] font-medium text-black text-xs rounded-2xl px-2 py-[2px] flex items-center justify-center ${
                            index === Services.length - 1 ? ' bg-cantaloupe' : 'bg-whiteseñales'
                            }`} > {service.type} </p> );
                    })}
            </div>

            <div className="flex justify-evenly w-[250px]">
                <p className="text-3xl font-custom font-extrabold text-black">${price}</p>
                <NavLink to={`/detail/${alojamiento.id}`} className='flex items-center justify-center no-underline'>
                    <button className='h-9 w-12 bg-verdelimon font-custom font-bold rounded-lg shadow-custom-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-verdelimon focus:ring-opacity-50 active:transform active:scale-95'>Más</button>
                </NavLink>
            </div>
            
        </div>
    )
}



