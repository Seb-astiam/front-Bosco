import { useSelector } from "react-redux";
import { useLocationProvincias } from "../../Hooks/useLocationProvincias";
import { getAllAlojamientos } from "../../Redux/boscoSlice";
import { useDispatch } from "react-redux";

import axios from "axios";
import { useEffect, useState } from "react";
import { useServices } from "../../Hooks/useServices";
import useCities from "../../Hooks/useCities";
//comentario generico para poder comitear

export const Filtros = () => {
  useLocationProvincias();
  useServices();
  const dispatch = useDispatch();


  // Obtener provincias del estado
  const provincias = useSelector((state) => state.storage.AllProvinces);
  // Obtener ciudades del estado
  //!
  const Localidades = useSelector((state) => state.storage.AllCities);
  //!
  // Obtener servicios del estado
  const services = useSelector((state) => state.storage.AllService);
  //!
  // Obtener alojamientos del estado
  const Alojamiento = useSelector((state) => state.storage.allAlojamientos);

  // Estado local para los filtros
  const initialState = {
    provinces: "",
    cities: "",
    serviceId: "",
    square: "",
    minPrice: "",
    maxPrice: "",
    startDate: "",
    endDate: "",
    orderBy: "price",
    orderDirection: "",
  };

  const [filter, setFilter] = useState(initialState);
 

  const URL = "http://localhost:3001/profileHousing/filtered";

  // Función para manejar cambios en los filtros
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

  // Estado para mostrar o no mostrar los filtros
  const [show, setShow] = useState(true);

  // Función para resetear los filtros
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

  // Efecto para mostrar los filtros cuando cambian los alojamientos
  useEffect(() => {
    setShow(true);
  }, [Alojamiento]);

  // Obtener las ciudades según la provincia seleccionada
  const selectedProvince = filter.provinces;
  const cities = useCities(selectedProvince ? selectedProvince : null);

  return (
    <div className="w-[300px] bg-whiteseñales ml-[20px] mt-[10px] rounded-lg shadow-lg h-[100vh] font-custom pt-4">
      {show && (
        <div className="">
          <div className="flex flex-row items-center justify-between border-b-4 border-gray-400 shadow-md px-2">
            <h1 className="font-custom font-bold text-[20px] text-start">
              Filtrar por:
            </h1>
            <button
              className="text-[#8b8e58] font-semibold cursor-pointer flex items-end justify-center hover:underline"
              onClick={resetFilter}
            >
              Resetear Filtros
            </button>
          </div>
          <div className="flex flex-col p-4 font-semibold  border-gray-200 border-b shadow-md">
            <label> Ordenar por:</label>
            <select
              name="orderDirection"
              onChange={handleChange}
              className=" bg-transparent text-[#8b8e58] focus:outline-none"
            >
              <option value="" className="">
                Más relevantes
              </option>
              <option value="ASC">Menor precio</option>
              <option value="DESC">Mayor precio</option>
            </select>
          </div>
          <div className="flex flex-col p-4 font-semibold  border-gray-200 shadow-md border-b">
            <label> Provincia:</label>
            <select
              onChange={handleChange}
              name="provinces"
              className="bg-transparent text-[#8b8e58] focus:outline-none"
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
          </div>
          <div className="flex flex-col p-4 font-semibold  border-gray-200 shadow-md border-b">
            <label> Localidad:</label>
            <select
              onChange={handleChange}
              name="cities"
              className="bg-transparent text-[#8b8e58] focus:outline-none"
            >
              <option value="">Escoge una localidad</option>
              {cities.map((localidad) => (
                <option value={localidad.name} key={localidad.id}>
                  {localidad.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col p-4 font-semibold  border-gray-200 shadow-md border-b">
            <label> Servicios:</label>
            <select
              onChange={handleChange}
              name="serviceId"
              className="bg-transparent text-[#8b8e58] focus:outline-none"
            >
              <option value="">Escoge un servicio</option>
              {services.map((service) => {
                return (
                  <option value={service.id} key={service.id}>
                    {service.type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-row items-center p-4 font-semibold  border-gray-200 shadow-md border-b">
            <label htmlFor="square">Plazas:</label>
            <div className="w-[40px] p-2 rounded-[20px] bg-white bg-opacity-60 ml-[20px]">
              <input
                type="number"
                id="square"
                name="square"
                min="1"
                max="20"
                onChange={handleChange}
                value={filter.square}
                defaultValue={1}
                className="bg-transparent text-[#8b8e58] focus:outline-none text-[15px] w-[35px] ml-[5px]"
              />
            </div>
          </div>
          <div className="flex flex-col p-4 font-semibold border-gray-200 shadow-md border-b ">
            <label htmlFor="square">Precio:</label>
            <div className="flex flex-row mt-[10px]">
              <div className="flex flex-row justify-center items-center w-[100px] py-2 pr-4 pl-2 rounded-[20px] bg-white bg-opacity-60 ml-[15px]">
                <label
                  htmlFor="minPrice"
                  className="bg-transparent focus:outline-none text-[12px] "
                >
                  Mín:
                </label>
                <a className="flex flex-row bg-transparent text-[#8b8e58] focus:outline-none text-[15px] w-[50px] ml-[5px] font-medium">
                  {" "}
                  $
                  <input
                    value={filter.minPrice}
                    name="minPrice"
                    id="minPrice"
                    type="number"
                    min="0"
                    max="99000"
                    step="1000"
                    placeholder={filter.minPrice}
                    onChange={handleChange}
                    className="bg-transparent text-[#8b8e58] font-medium focus:outline-none text-[15px] w-[60px]"
                  />
                </a>
              </div>
              <div>
                <div className="flex flex-row justify-center items-center w-[100px] py-2 pr-4 pl-2 rounded-[20px] bg-white bg-opacity-60 ml-[15px]">
                  <label
                    htmlFor="maxPrice"
                    className="bg-transparent focus:outline-none text-[12px]"
                  >
                    Máx:
                  </label>
                  <a className="flex flex-row bg-transparent text-[#8b8e58] focus:outline-none text-[15px] w-[50px] ml-[5px] font-medium">
                    {" "}
                    $
                    <input
                      value={filter.maxPrice}
                      name="maxPrice"
                      id="maxPrice"
                      type="number"
                      min={parseInt(filter.minPrice) + 1000}
                      max="99000"
                      step="1000"
                      onChange={handleChange}
                      className="bg-transparent text-[#8b8e58] font-medium focus:outline-none text-[15px] w-[60px]"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 font-semibold  ">
            <label htmlFor="square">Fecha:</label>
            <div className="flex flex-row mt-[10px]">
              <div className="flex flex-col justify-center items-center ">
                <label
                  htmlFor="minPrice"
                  className="bg-transparent focus:outline-none text-[12px] mb-1"
                >
                  Entrada:
                </label>
                <input
                  value={filter.startDate}
                  name="startDate"
                  id="startDate"
                  type="date"
                  max={filter.endDate}
                  placeholder={filter.minPrice}
                  onChange={handleChange}
                  className="w-[100px] py-2 pl-1 rounded-[20px] bg-white bg-opacity-60 ml-[15px] bg-transparent text-[#8b8e58] font-medium focus:outline-none text-sm"
                />
              </div>
              <div>
                <div className="flex flex-col justify-center items-center ">
                  <label
                    htmlFor="maxPrice"
                    className="bg-transparent focus:outline-none text-[12px] mb-1"
                  >
                    Salida:
                  </label>
                  <input
                    value={filter.endDate}
                    name="endDate"
                    id="endDate"
                    type="date"
                    min={filter.startDate}
                    onChange={handleChange}
                    className="bg-transparent text-[#8b8e58] font-medium focus:outline-none text-sm w-[100px] py-2 pl-1 rounded-[20px] bg-white bg-opacity-60 ml-[15px]"
                  />
                </div>
          
              </div>
              
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};
