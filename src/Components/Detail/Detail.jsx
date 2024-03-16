import React from 'react';
import { useParams } from 'react-router-dom';
import CardsData from "/CardsPrueba.json"

const Detail = () => {
    const cardsData = CardsData;
  const { id } = useParams(); // Obtén el ID de la URL
  const card = cardsData.find(card => card.id === parseInt(id)); // Busca la tarjeta correspondiente en los datos

  if (!card) {
    return <div>No se encontró la tarjeta</div>; // Maneja el caso en que no se encuentre la tarjeta
  }

  const { ubicación, calificación, precio, estatus, fechasDisponibles } = card;

  return (
    <div className="bg-orange-200 p-4 rounded-xl border border-gainsboro">
    <div className="flex justify-between mb-4">
      {/* Repite la imagen tres veces */}
      <div className="w-1/3 mr-4">
        <img
          className="h-48 w-full rounded-xl object-cover mb-4"
          src="/chichiua.jpg"
          alt=""
        />
      </div>
      <div className="w-1/3 mr-4">
        <img
          className="h-48 w-full rounded-xl object-cover mb-4"
          src="/chichiua.jpg"
          alt=""
        />
      </div>
      <div className="w-1/3">
        <img
          className="h-48 w-full rounded-xl object-cover mb-4"
          src="/chichiua.jpg"
          alt=""
        />
      </div>
    </div>
    <div className="flex justify-between">
      <p className="text-base text-dimgray">{ubicación}</p>
      <p className="text-base text-dimgray">{calificación}</p>
    </div>
    <p className="text-sm text-midnightblue font-light mb-2">{fechasDisponibles}</p>
    <div className="flex justify-between">
      <p className="text-base text-dimgray">{precio}</p>
      <p className="text-base text-green-600">{estatus}</p>
    </div>
  </div>
  );
};

export default Detail;
