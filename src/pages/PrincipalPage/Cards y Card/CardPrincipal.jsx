import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
useNavigate

export const CardPrincipal = ({alojamiento}) => {
    const [indexImage, setIndexImage] = useState(0);
    const [hover, setHover] = useState(false);

    const { accommodationType, datesAvailable, datesEnd, images, provinces, cities, price, square, title, Services } = alojamiento;
    
    const changeImage = (direccion) => {
        if (direccion === 'anterior') {
            setIndexImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        } else {
            setIndexImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }
      };

    return (
        
        <div className='flex flex-col items-center h-[400px] w-[300px]  bg-white rounded-[15px] justify-between'>  
       
            <div className="relative pt-2" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {hover && (
                    <button onClick={() => changeImage("anterior")}
                    className="absolute top-1/2 transform -translate-y-1/2 left-4 rounded-[50%] bg-white bg-opacity-70 hover:bg-white hover:bg-opacity-100 cursor-pointer z-10"
                    >❮</button>
                )}
                {hover && (
                    <button onClick={() => changeImage("siguiente")}
                    className="absolute top-1/2 transform -translate-y-1/2 right-4 rounded-[50%] bg-white bg-opacity-70 hover:bg-white hover:bg-opacity-100 cursor-pointer z-10"
                    >❯</button>
                )}

                <img className="w-[250px] h-[220px] rounded-lg" src={images[indexImage]} alt={`Imagen ${indexImage + 1}`} />
           
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    {images.map((image, idx) => (
                        <span key={idx} onClick={() => setIndexImage(idx)} className={`mx-1 w-3 h-3 rounded-full cursor-pointer ${idx === indexImage ? 'bg-white' : 'bg-gray-300'}`}></span>
                    ))}
                </div>
            </div>
            
            <NavLink to={`/detail/${alojamiento.id}`} className='no-underline'>
            <div className="text-start flex w-[240px] flex-col">
                <p className="text-base font-custom font-semibold text-black my-1">{title}</p>
                <p className="font-custom font-semibold text-gray-500 text-[13px] my-1">{cities}, {provinces}</p>
            </div>
            <div className="text-start flex flex-wrap gap-1 w-[240px]">
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
            <div className="flex mb-3 w-[240px]">
                <p className="text-[15px] font-custom font-semibold  text-black my-1">${price},00 ARS / noche</p>
            </div>
            </NavLink>
        </div>
    )
}



