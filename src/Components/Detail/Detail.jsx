import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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
    location,
    price,
    square,
    title,
    Services,
  } = card;

  const [activeImg, setActiveImage] = useState(images[0]);
  const [amount, setAmount] = useState(1);

  const handleAmountChange = (increment) => {
    if ((increment === -1 && amount > 1) || increment === 1) {
      setAmount((prev) => prev + increment);
    }
  };

  const handleClick = () => {
      navigate('/formReserva', {
        state: {
            id: id
        }
    })
  }

  return (
    <div className="flex flex-col lg:flex-row gap-16 lg:items-start rounded-xl py-5 w-full  justify-center bg-lime-100">
      <div className="flex flex-col gap-6 lg:w-2/4 py-6 items-center bg-white shadow">
        <img
          src={activeImg}
          alt=""
          className="w-[50%] h-[400px] bg-cover rounded-xl"
        />
        <div className="flex flex-row justify-between h-24 gap-6 ">
          {Object.values(images).map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="w-24 h-24 rounded-md cursor-pointer"
              onClick={() => setActiveImage(image)}
            />
          ))}
        </div>
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-5 lg:w-2/4 w-full justify-center items-center">
        <div className="flex gap-10 items-end justify-center w-auto px-5 rounded-xl bg-white shadow">
          <h1 className="text-violet-600 font-bold font-mono">
            {accommodationType}
          </h1>
          <h1 className="text-3xl font-bold font-mono pb-3">{title}</h1>
        </div>

        <div className="flex items-center justify-center w-[50%] gap-2 ">
          {Services.map((service) => {
            return (
              <p
                key={service.id}
                className={`shadow w-[50%] font-custom text-[20px] font-semibold text-black rounded px-2 py-[2px] flex items-center justify-center bg-olive }`}
              >
                {" "}
                {service.type}{" "}
              </p>
            );
          })}
        </div>

        <div className="mt-[-20px] flex flex-col items-center justify-center bg-white p-6 rounded shadow">
          <p className="text-3xl font-bold">Plazas disponibles</p>
          <h1 className="text-black  items-center pb-4">{square}</h1>
        </div>
        <div className="flex items-center justify-center w-full">
          <h1 className="text-2xl font-semibold text-lime-700 ">$ {price}</h1>
        </div>

        <div className="flex items-center justify-center">
          <button className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
            onClick={handleClick}
          >
            Realiza tu reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
