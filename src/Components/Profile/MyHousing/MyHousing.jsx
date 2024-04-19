import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ValidateFormdata } from "../../Register/ProfileHousing/validate";
import { useServices } from "../../../Hooks/useServices";
import { useLocationProvincias } from "../../../Hooks/useLocationProvincias";
import useCities from "../../../Hooks/useCities";
import { useTiposAlojamientos } from "../../../Hooks/useTiposAlojamientos";
export const MyHousing = (param) => {
  useServices();
  useLocationProvincias();
  useCities();
  useTiposAlojamientos();

  const { formHousing ,selectedHousing} = param
  const TiposHost = useSelector((state) => state.storage.TipoAlojamientos);
  const provincias = useSelector((state) => state.storage.AllProvinces);
  const services = useSelector((state) => state.storage.AllService);
  const [formData, setFormData] = useState({
    title: "",
    provinces: "",
    cities: "",
    datesAvailable: "",
    datesEnd: "",
    price: "",
    accommodationType: "",
    services: [],
    square: "",
    images: [],
  });
  console.log(formHousing.Services.map((e)=>{return e.id;}));
  const [disableSubmitHousing, setDisableSubmitHousing] = useState(true);
  const [errorsHousing, setErrorsHousing] = useState({});
  useEffect(() => {
    setFormData({
      ...formData
      , ...formHousing,
      services:formHousing.Services.map((e)=>{return e.id;}) 
      
    })
  }, [selectedHousing])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const validationErrors = ValidateFormdata({
      ...formData,
      [name]: value, // Actualiza el valor cambiado en el objeto formData
    });

    setErrorsHousing(validationErrors);
    const errorMessages = Object.values(validationErrors);
    setDisableSubmitHousing(errorMessages.some((ermsg) => ermsg !== ""));
  };
  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    const serviceId = parseInt(value); // Convertimos el valor a número
    setFormData((prevData) => ({
      ...prevData,
      services: checked
        ? [...prevData.services, serviceId] // Convertimos el ID a cadena
        : prevData.services.filter((service) => service !== serviceId), // Convertimos el ID a cadena
    }));

    const validationErrors = ValidateFormdata({
      ...formData,
      services: checked
        ? [...formData.services, serviceId] // Convertimos el ID a cadena
        : formData.services.filter((service) => service !== serviceId), // Convertimos el ID a cadena
    });

    setErrorsHousing(validationErrors);
    const errorMessages = Object.values(validationErrors);
    setDisableSubmitHousing(errorMessages.some((ermsg) => ermsg !== ""));
  };
  const selectedProvince = formData.provinces;
  const cities = useCities(selectedProvince ? selectedProvince : null);

  return (
    <div>
      <div className="flex flex-col border-4 w-[500px] p-5 border-black space-y-4">
        <label htmlFor="title" className="text-sm">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </label>
        <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
          {errorsHousing.title}
        </p>
        {formData.hourly ? (
          <div className="flex flex-row">
            <label
              htmlFor="datesAvailable"
              className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-bl-[20px] "
            >
              <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                Hora de inicio
              </a>
              <input
                type="number"
                name="hourAvailable"
                id="hourAvailable"
                onChange={handleChange}
                value={formData.hourAvailable}
                min={0}
                max={formData.hourEnd}
                step={1}
                className="outline-none w-12"
              />
            </label>
            <label
              htmlFor="datesEnd"
              className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-br-[20px] "
            >
              <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                Hora de fin
              </a>
              <input
                type="number"
                name="hourEnd"
                id="hourEnd"
                onChange={handleChange}
                value={formData.hourEnd}
                min={formData.hourAvailable}
                step={1}
                max={24}
                className="outline-none w-12"
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-row">
            <label
              htmlFor="datesAvailable"
              className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-bl-[20px] "
            >
              <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                Fecha de inicio
              </a>
              <input
                type="date"
                name="datesAvailable"
                id="datesAvailable"
                onChange={handleChange}
                value={formData.datesAvailable}
                max={formData.datesEnd}
                className="outline-none"
              />
            </label>
            <label
              htmlFor="datesEnd"
              className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-br-[20px] "
            >
              <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                Fecha de fin
              </a>
              <input
                type="date"
                name="datesEnd"
                id="datesEnd"
                onChange={handleChange}
                value={formData.datesEnd}
                min={formData.datesAvailable}
                className="outline-none"
              />
            </label>
          </div>
        )}
        {formData.hourly ? (
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errorsHousing.hourAvailable}
          </p>
        ) : (
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errorsHousing.datesAvailable}
          </p>
        )}
        <label htmlFor="type" className="text-sm">
          Type:
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </label>

        <div className="flex flex-row justify-between  gap-4">
          <label
            htmlFor="square"
            className="flex items-center px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500 "
          >
            Plazas
            <input
              placeholder="Cantidad de plazas"
              type="number"
              name="square"
              id="square"
              min="1"
              max="20"
              step="1"
              onChange={handleChange}
              value={formData.square}
              className="w-[40px] outline-none ml-2"
            />
          </label>
          <label
            htmlFor="price"
            className="flex items-center px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500 "
          >
            Precio $
            <input
              type="number"
              name="price"
              id="price"
              min="1000"
              max="99000"
              step="1000"
              onChange={handleChange}
              value={formData.price}
              className="w-[55px] outline-none ml-2"
            />
          </label>
        </div>
        <div className="flex flex-row">
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errorsHousing.square}
          </p>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errorsHousing.price}
          </p>
        </div>
        <label
          htmlFor="provinces"
          className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
        >
          <box-icon name="map-alt"></box-icon>
          <select
            name="provinces"
            id="provinces"
            onChange={handleChange}
            value={formData.provinces}
            className="w-[225px] outline-none"
          >
            <option value="" disabled selected>
              Selecciona una provincia
            </option>
            {provincias.map((provincia) => (
              <option value={provincia.nombre} key={provincia.id}>
                {provincia.nombre}
              </option>
            ))}
          </select>
        </label>
        <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
          {errorsHousing.provinces}
        </p>
        <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
          <box-icon name="map"></box-icon>
          <select
            id="cities"
            value={formData.cities}
            onChange={handleChange}
            name="cities"
            className="w-[225px] outline-none"
          >
            <option value="" disabled selected>
              Selecciona una localidad
            </option>
            {cities.map((localidad) => (
              <option value={localidad.name} key={localidad.id}>
                {localidad.name}
              </option>
            ))}
          </select>
        </label>
        <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
          {errorsHousing.cities}
        </p>
        <label
          htmlFor="accommodationType"
          className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
        >
          <box-icon name="building-house"></box-icon>
          <select
            name="accommodationType"
            id="accommodationType"
            onChange={handleChange}
            value={formData.accommodationType}
            className="w-[225px] outline-none"
          >
            <option value="" disabled selected>
              Selecciona un tipo de alojamiento
            </option>
            {TiposHost.map((tipo) => {
              return (
                <option key={tipo.id} value={tipo.type}>
                  {tipo.type}
                </option>
              );
            })}
          </select>
        </label>

        {formData.images.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm font-bold mb-2">
              Previsualización de Imágenes:
            </p>
            <div className="flex">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center mr-2">
                  <div className="relative">
                    <img
                      src={image}
                      alt={`Imagen ${index + 1}`}
                      className="h-16 w-16 object-cover mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white font-bold py-1 px-2 rounded-full"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
              {[...Array(3 - formData.images.length)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 w-16 border border-gray-300 flex items-center justify-center rounded-md mr-2"
                >
                  <span className="text-gray-400 text-xs">
                    Imagen {formData.images.length + index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <label htmlFor="services" className="text-sm">
          Services:

          {services.map((service) => (
            <label
              key={service.id}
              className="bg-white p-[5px] m-[3px] inline-flex items-center rounded-[20px] ml-4"
            >
              <input
                type="checkbox"
                name="services"
                value={service.id}
                onChange={handleServiceChange}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{service.type}</span>
            </label>
          ))}
        </label>
        <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
          {errorsHousing.services}
        </p>

      </div>
    </div>
  );


};
