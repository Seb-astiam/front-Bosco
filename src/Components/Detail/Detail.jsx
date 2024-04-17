import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormReserva } from "../Register/formReserva/formReserva";
const Detail = () => {
  const { id } = useParams(); // Obtén el ID de la URL

  const Alojamiento = useSelector((state) => state.storage.allAlojamientos);
  const card = Alojamiento.find((card) => card.id === parseInt(id)); // Busca la tarjeta correspondiente en los datos

  if (!card) {
    return <div>No se encontró la tarjeta</div>; // Maneja el caso en que no se encuentre la tarjeta
  }
  const {
    accommodationType,
    hourly,
    datesAvailable,
    datesEnd,
    images,
    provinces,
    cities,
    price,
    square,
    title,
    Services,
    User,
  } = card;

  const [activeImg, setActiveImage] = useState(images[0]);
  const secondaryImages = images.filter((image) => image !== activeImg);

  const handleImageClick = (image) => {
    // Establecer la nueva imagen como activa
    setActiveImage(image);
  };

  const [indexImage, setIndexImage] = useState(0);

    const changeImage = (direccion) => {
        if (direccion === 'anterior') {
            setIndexImage((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        } else {
            setIndexImage((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }
      };

  return (
    <div className="flex flex-col lg:flex-row gap-16 lg:items-center rounded-xl py-5 w-full justify-center bg-white">
      <div className="flex flex-row justify-center items-center h-[525px] mq900:max-h-[300px] mq900:h-auto px-[20px]">
            <div className="mq1300:hidden w-[95%] mq1650:hidden mq900:block relative pt-2" >
               
                    <button onClick={() => changeImage("anterior")}
                    className=" absolute top-1/2 transform -translate-y-1/2 left-4 rounded-[50%] bg-white bg-opacity-70 hover:bg-white hover:bg-opacity-100 cursor-pointer z-10"
                    >❮</button>
               
                    <button onClick={() => changeImage("siguiente")}
                    className=" absolute top-1/2 transform -translate-y-1/2 right-4 rounded-[50%] bg-white bg-opacity-70 hover:bg-white hover:bg-opacity-100 cursor-pointer z-10"
                    >❯</button>
              

                <img className=" w-full h-[auto] rounded-[20px]" src={images[indexImage]} alt={`Imagen ${indexImage + 1}`} />
           
                <div className=" absolute bottom-4 left-0 right-0 flex justify-center">
                    {images.map((image, idx) => (
                        <span key={idx} onClick={() => setIndexImage(idx)} className={`mx-1 w-3 h-3 rounded-full cursor-pointer ${idx === indexImage ? 'bg-white' : 'bg-gray-300'}`}></span>
                    ))}
                </div>
            </div>
        <div className="mq900:hidden flex w-full lg:w-[60%] gap-6 py-6 mr-[20px]">

          <img
            src={activeImg}
            alt=""
            className=" mq900:hidden w-full h-[500px] bg-cover rounded-tl-xl rounded-bl-xl"
          />
        </div>
        <div className="mq900:hidden flex flex-col w-[40%] gap-6 py-6">
          {secondaryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`w-full h-[235px] object-cover cursor-pointer ${
                index === 0
                  ? "rounded-tr-xl"
                  : index === 1
                  ? "rounded-br-xl"
                  : ""
              }`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row mq900:flex-col justify-center items-start px-[20px]">
        <div className="flex flex-col lg:w-2/4 w-full justify-start items-start px-[20px] mq900:mb-6 ">
          <div className="flex flex-col items-start justify-start w-[60%] mq900:w-full">
            <h1 className="font-custom font-bold m-0 text-gray-700">{title}</h1>
            <h2 className="font-semibold font-custom m-0 text-gray-500">
              {accommodationType}, en {cities}, {provinces}
            </h2>
          </div>

          <div className="flex font-custom text-gray-700 font-semibold">
            <p className="mr-2">Nombre del anfitrión: {User?.name}</p>
            <p>Email: {User?.email}</p>
          </div>

          <div className="flex items-center justify-center gap-2 ">
            {Services.map((service) => {
              return (
                <p
                  key={service.id}
                  className={`shadow w-[50%] font-custom text-[15px] font-semibold text-white rounded-[50px] py-2 px-4 flex items-center justify-center bg-chocolate-100 }`}
                >
                  {" "}
                  {service.type}{" "}
                </p>
              );
            })}
          </div>
          <div className="font-custom text-gray-700 mt-4 mq900:w-[95%] mq900:flex mq900:items-center mq900:justify-center">
            En nuestro refugio para perros, nos dedicamos a proporcionar un
            entorno seguro y acogedor donde los perros puedan sentirse como en
            casa mientras están lejos de sus familias. Contamos con amplias
            instalaciones diseñadas para promover su bienestar físico y
            emocional, incluyendo áreas de juego al aire libre y zonas de
            descanso tranquilo. Nuestro spa canino ofrece tratamientos
            relajantes y cuidados personalizados, mientras que nuestras comidas
            caseras y nutritivas garantizan una dieta equilibrada para cada
            perro. Además, ofrecemos una variedad de actividades y juegos para
            mantenerlos activos y comprometidos durante su estancia. En nuestro
            refugio, cada perro recibe atención individualizada y amorosa,
            brindándoles el cuidado y la compañía que necesitan para sentirse
            felices y seguros.
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-[40%] mq900:w-[95%] mq900:mx-[10px] rounded-[20px] shadow-lg py-4 bg-whiteseñales">
          <p className="font-semibold font-custom text-[20px] text-gray-700">${price},00 ARS /noche </p>

          
            <div className="flex flex-row mq900:justify-center mq900:items-center">
              <FormReserva id={id} hourly={hourly} />
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Detail;
