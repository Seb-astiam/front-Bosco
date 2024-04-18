import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormReserva } from "../Register/formReserva/formReserva";

import ReviewList from "../ReviewAndComents/ReviewList";
import axios from "axios";
import DetailImages from "./DetailImages";

const Detail = () => {
  const { id } = useParams(); // Obtén el ID de la URL
  const [housing, setHousing] = useState({});

  useEffect(() => {
    const loadHousing = async () => {
      try {
        const { data } = await axios(`/profileHousing/getHousingId/${id}`);
        setHousing(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadHousing();
  }, [id]);

  return housing?.title ? (
    <div className="flex flex-col lg:flex-row gap-16 lg:items-center rounded-xl py-5 w-full justify-center bg-white">
      <DetailImages images={housing.images} />
      <div className="flex flex-row justify-center items-start px-[20px]">
        {/* ABOUT */}
        <div className="flex flex-col lg:w-2/4 w-full justify-start items-start px-[20px] ">
          <div className="flex flex-col items-start justify-start w-[60%]">
            <h1 className="font-custom font-bold m-0">{housing.title}</h1>
            <h2 className="font-bold font-custom m-0 text-gray-700">
              {housing.accommodationType}, en {housing.cities},{" "}
              {housing.provinces}
            </h2>
          </div>

          <div className="flex gap-7">
            <p>Nombre del Anfitrion: {housing.User?.name}</p>
            <p>Email: {housing.User?.email}</p>
          </div>

          <div className="flex items-center justify-center gap-2 ">
            {housing.Services.map((service) => {
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

        <div className="mt-[80px]">
          <ReviewList />
        </div>

        <div className="flex flex-col justify-center items-center w-[40%] rounded-[20px] shadow-lg py-4 bg-whiteseñales">
          <p className="text-3xl font-custom">{housing.price},00 ARS /noche </p>

          <div className="flex flex-col">
            <div className="flex flex-row">
              <FormReserva id={id} hourly={housing.hourly} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <p className="font-bold italic text-40xl-5 font-custom text-yellow-500">
        Cargando...
      </p>
    </div>
  );
};

export default Detail;
