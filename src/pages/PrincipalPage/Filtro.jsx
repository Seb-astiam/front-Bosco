import { useSelector } from "react-redux";
import { useLocationProvincias } from "../../Hooks/useLocationProvincias";
import { getAllAlojamientos } from "../../Redux/boscoSlice";
import { useDispatch } from "react-redux";

import axios from "axios";
import { useEffect, useState } from "react";
import { useServices } from "../../Hooks/useServices";
import IsoLogotipo from "../../assets/IsoLogotipoBosco.png";

export const Filtros = () => {
  useLocationProvincias();
  useServices();
  const dispatch = useDispatch();

  const initialState = {
    location: "",
    serviceId: "",
    square: 1,
    maxPrice: "",
    startDate: "",
    endDate: "",
    orderBy: "",
    orderDirection: "",
  };

  const [filter, setFilter] = useState(initialState);

  const URL = "http://localhost:3001/profileHousing/filtered";

  const provincias = useSelector((state) => state.storage.AllLocation);
  const services = useSelector((state) => state.storage.AllService);
  const Alojamiento = useSelector((state) => state.storage.allAlojamientos);

  const handleChange = async (e) => {
    const changeFilter = { ...filter, [e.target.name]: e.target.value };
    setFilter(changeFilter);
    let query = "?";

    for (const [key, value] of Object.entries(changeFilter)) {
      if (value) query += `${key}=${value}&`;
    }

    try {
      const { data } = await axios.get(URL + query);
      dispatch(getAllAlojamientos(data));
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(true);

  const resetFilter = async () => {
    setFilter(initialState);

    if (show) setShow(false);

    try {
      const { data } = await axios.get(URL);
      dispatch(getAllAlojamientos(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShow(true);
  }, [Alojamiento]);

  return (
    <div className="w-[400px] bg-whiteseñales  shadow-lg h-[100vh] p-2 font-custom font-bold pt-8">
      {show && (
        <div>
          <h1 className="font-custom font-extrabold text-center">Filtros</h1>
          <select
            onChange={handleChange}
            name="location"
            className="py-1 my-2 font-custom font-semibold w-4/5 rounded-lg border-solid border-2"
          >
            <option value="">Escoge una provincia</option>
            {provincias.map((provincia) => {
              return (
                <option value={provincia.nombre} key={provincia.id}>
                  {provincia.nombre}
                </option>
              );
            })}
          </select>
          <select
            onChange={handleChange}
            name="serviceId"
            className="py-1 my-2 font-custom font-semibold w-4/5 rounded-lg border-solid border-2"
          >
            <option value="">Servicios</option>
            {services.map((service) => {
              return (
                <option value={service.id} key={service.id}>
                  {service.type}
                </option>
              );
            })}
          </select>
          <div className="">
            <label htmlFor="square">Plazas</label>
            <input
              type="number"
              id="square"
              name="square"
              min="1"
              max="20"
              onChange={handleChange}
              value={filter.square}
              defaultValue={1}
              className="py-1 my-2 font-custom font-semibold w-2/5 rounded-lg mx-2 border-solid border-2"
            />
          </div>
          <div>
            <label htmlFor="maxPrice">Precio</label>
            <input
              value={filter.maxPrice}
              name="maxPrice"
              id="maxPrice"
              type="range"
              min="5"
              max="100"
              step="5"
              onChange={handleChange}
              className="py-1 my-2 font-custom font-semibold w-2/5 rounded-lg mx-2 border-solid border-2"
            ></input>
            {<span>${filter.maxPrice}</span>}
          </div>
          <hr className="border-solid border-2 border-gray-200" />
          <div>
            <label className="mr-2">Orden</label>
            <select
              name="orderBy"
              onChange={handleChange}
              className="py-1 my-2 font-custom font-semibold w-3/5 rounded-lg border-solid border-2"
            >
              <option value="">Escoge un tipo orden</option>
              <option value="price">Precio</option>
              <option value="square">Plazas</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Sentido</label>
            <select
              name="orderDirection"
              onChange={handleChange}
              className="py-1 my-4 font-custom font-semibold w-2/5 rounded-lg border-solid border-2"
            >
              <option value="">Escoge una dirección de orden</option>
              <option value="DESC">DESCENDENTE</option>
              <option value="ASC">ASCEDENTE</option>
            </select>
          </div>
        </div>
      )}
      <hr className="border-solid border-2 border-gray-200" />
      <div className="flex justify-center px-8">
        <button
          className="text-white font-bold font-custom cursor-pointer w-1/2 border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-center whitespace-nowrap z-[3] hover:bg-[#d14d12]"
          onClick={resetFilter}
        >
          Resetear Filtros
        </button>
      </div>
    </div>
  );
};
