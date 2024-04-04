import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {FormReserva } from "../Register/formReserva/formReserva"
const Detail = () => {
  const { id } = useParams(); // Obtén el ID de la URL

  const navigate = useNavigate()

  const Alojamiento = useSelector((state) => state.storage.allAlojamientos);
  const card = Alojamiento.find((card) => card.id === parseInt(id)); // Busca la tarjeta correspondiente en los datos

  if (!card) {
    return <div>No se encontró la tarjeta</div>; // Maneja el caso en que no se encuentre la tarjeta
  }

  const {
    accommodationType,
    datesAvailable,
    datesEnd,
    images,
    provinces,
    cities,
    price,
    square,
    title,
    Services,
    User
  } = card;


  const handleClick = () => {
      navigate('/formReserva', {
        state: {
            id: id
        }
    })
  }


  const [activeImg, setActiveImage] = useState(images[0]);
  const secondaryImages = images.filter(image => image !== activeImg);

  const handleImageClick = (image) => {
    // Establecer la nueva imagen como activa
    setActiveImage(image);
  };


  return (
    <div className="flex flex-col lg:flex-row gap-16 lg:items-center rounded-xl py-5 w-full justify-center bg-white">
      <div className="flex flex-row justify-center items-center h-[525px] px-[20px]">
        <div className="flex w-full lg:w-[60%] gap-6 py-6 mr-[20px]">
          <img
            src={activeImg}
            alt=""
            className="w-full h-[500px] bg-cover rounded-tl-xl rounded-bl-xl"
          />
        </div>
        <div className="flex flex-col w-[40%] gap-6 py-6">
          {secondaryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`w-full h-[235px] object-cover cursor-pointer ${
                index === 0 ? 'rounded-tr-xl' : index === 1 ? 'rounded-br-xl' : ''
              }`}
              onClick={() => handleImageClick(image)}
             />
            ))}
        </div>
      </div>
      <div className="flex flex-row justify-center items-start px-[20px]">
      {/* ABOUT */}
      <div className="flex flex-col lg:w-2/4 w-full justify-start items-start px-[20px] ">
        <div className="flex flex-col items-start justify-start w-[60%]">
          <h1 className="font-custom font-bold m-0">{title}</h1>
          <h2 className="font-bold font-custom m-0 text-gray-700">{accommodationType}, en {cities}, {provinces}</h2>
        </div>

        <div className="flex gap-7">
          <p>Nombre del Anfitrion: {User?.name}</p>
          <p>Email: {User?.email}</p>
        </div>

        <div className="flex items-center justify-center gap-2 ">
          {Services.map((service) => {
            return (
              <p
                key={service.id}
                className={`shadow w-[50%] font-custom text-[20px] font-semibold text-gray-700 rounded-[50px] p-3 flex items-center justify-center bg-cantaloupe }`}
              >
                {" "}
                {service.type}{" "}
              </p>
            );
          })}
        </div>
        <div className="font-custom">
        En nuestro refugio para perros, nos dedicamos a proporcionar un entorno seguro y acogedor donde los perros puedan sentirse como en casa mientras están lejos de sus familias. Contamos con amplias instalaciones diseñadas para promover su bienestar físico y emocional, incluyendo áreas de juego al aire libre y zonas de descanso tranquilo.

        Nuestro spa canino ofrece tratamientos relajantes y cuidados personalizados, mientras que nuestras comidas caseras y nutritivas garantizan una dieta equilibrada para cada perro. Además, ofrecemos una variedad de actividades y juegos para mantenerlos activos y comprometidos durante su estancia.

        En nuestro refugio, cada perro recibe atención individualizada y amorosa, brindándoles el cuidado y la compañía que necesitan para sentirse felices y seguros.
        </div>

        </div>

        <div className="flex flex-col justify-center items-center w-[40%] rounded-[20px] shadow-lg py-4 bg-whiteseñales">
          <p className="text-3xl font-custom">{price},00 ARS /noche </p>

        <div className="flex flex-col">
        
        <div className="flex flex-row">
         
        <FormReserva/>
        </div>

       
        </div>
      </div>
    </div>
    </div>
  );
};

export default Detail;
