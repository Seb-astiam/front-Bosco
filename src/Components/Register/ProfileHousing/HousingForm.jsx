import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Switch from "react-switch";

import { ValidateFormdata } from "./validate";
import { useLocationProvincias } from "../../../Hooks/useLocationProvincias";
import { useServices } from "../../../Hooks/useServices";
import { useSelector } from "react-redux";
import useCities from "../../../Hooks/useCities";
import bosco from "../../../assets/bosco-logo.jpeg";
import { useTiposAlojamientos } from "../../../Hooks/useTiposAlojamientos";
import axiosJwt from "../../../utils/axiosJwt";

const HousingForm = () => {
  useServices();
  useLocationProvincias();
  useCities();
  useTiposAlojamientos();

  const TiposHost = useSelector((state) => state.storage.TipoAlojamientos);
  const provincias = useSelector((state) => state.storage.AllProvinces);
  const services = useSelector((state) => state.storage.AllService);

  const email = JSON.parse(localStorage.getItem("user")).email;
  const [formData, setFormData] = useState({
    title: "",
    provinces: "",
    cities: "",
    hourly: false,
    hourAvailable: "",
    hourEnd: "",
    datesAvailable: "",
    datesEnd: "",
    price: "",
    accommodationType: "",
    services: [],
    square: 0,
    images: [],
  });


  // manejo del boton de submit
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [formData]);

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, files, type, checked } = e.target;

    let newValue;

    if (name === "images") {
      newValue = [
        ...formData.images,
        ...Array.from(files).slice(0, 3 - formData.images.length),
      ];
    } else if (type === "checkbox") {
      newValue = checked
        ? [...formData.services, e.target.value]
        : formData.services.filter((service) => service !== e.target.value);
    } else {
      newValue = e.target.value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    const validationErrors = ValidateFormdata({
      ...formData,
      [name]: newValue, // Actualiza el valor cambiado en el objeto formData
    });

    setErrors(validationErrors);
    const errorMessages = Object.values(validationErrors);
    setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
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

    setErrors(validationErrors);
    const errorMessages = Object.values(validationErrors);
    setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
  };
  const handleHourlyChange = (checked) => {
    setFormData({ ...formData, hourly: checked });

    const validationErrors = ValidateFormdata({
      ...formData,
      hourly: checked,
    });

    setErrors(validationErrors);
    const errorMessages = Object.values(validationErrors);
    setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((image) => formDataToSend.append("images", image));
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axiosJwt.post(
        `/profileHousing/register?email=${email}`,
        formDataToSend
      );

      if (
        response.status === 201 &&
        response.data.message === "Datos recibidos correctamente"
      ) {
        // Mostrar SweetAlert de éxito
        Swal.fire({
          icon: "success",
          title: "¡Registro Exitoso!",
          text: "Los datos del alojamiento han sido registrados correctamente.",
        });
        if (show) setShow(false);
        clearFormData();
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearFormData = () => {
    setFormData({
      title: "",
      provinces: "",
      cities: "",
      datesAvailable: "",
      datesEnd: "",
      price: "",
      accommodationType: "",
      services: [],
      square: 0,
      images: [],
    });
  };

  /****************************** */
  // Obtener las ciudades según la provincia seleccionada
  const selectedProvince = formData.provinces;
  const cities = useCities(selectedProvince ? selectedProvince : null);

  return (
    <div className="flex  justify-center items-center mq900:mb-10 mq900:flex-col  mq900:h-full h-[1005px] w-full my-[50px] mq900:mt-0">
      <div className="flex justify-center h-full w-[50%] rounded-bl-[20px] rounded-tl-[20px] max-w-[95%] mq900:max-w-[95%] mq900:w-[95%] mq900:h-[350px] mq900:rounded-bl-[0px] mq900:rounded-tr-[20px] ">
        <img
          src={bosco}
          alt="bosco"
          className="w-full h-[1005px] object-cover mq900:mt-10 rounded-tl-[20px] rounded-bl-[20px] mq900:rounded-bl-[0px] mq900:rounded-tr-[20px] mq900:h-[350px]"
        />
      </div>
      <div className="flex flex-col items-center justify-center px-[50px] mq900:px-0 rounded-br-[20px] rounded-tr-[20px] mq900:rounded-tr-[0px] mq900:rounded-bl-[20px] mq900:w-[95%] mq900:max-w-[95%] h-[1005px] w-[400px] !bg-[#FEB156] max-w-[400px]">
        <h2 className="font-custom font-extrabold">Registrar alojamiento</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center my-[0%] px-[5%] mq900:px-0 justify-center rounded-br-[20px] rounded-tr-[20px] w-[100%]"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="title"
              className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
            >
              <box-icon name="home-heart"></box-icon>
              <input
                placeholder="Nombre del alojamiento"
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-[225px] outline-none"
              />
            </label>
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.title}
          </p>
          <div>
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
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.provinces}
          </p>
          <div>
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
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.cities}
          </p>
          <div>
            <div className="flex flex-col items-center px-[15px]  bg-[white] rounded-t-[20px] ">
              <p className="font-custom font-semibold text-[12px] mb-[15px] text-gray-500">
                Alojamiento por...
              </p>
              <div className="flex align-middle">
                <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 mr-3">
                  Días
                </span>
                <Switch
                  onChange={handleHourlyChange}
                  checked={formData.hourly}
                  onColor="#eb662b"
                  offColor="#eb662b"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={40}
                  handleDiameter={16}
                />
                <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 ml-3">
                  Horas
                </span>
              </div>
            </div>

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
          </div>
          {formData.hourly ? (
            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
              {errors.hourAvailable}
            </p>
          ) : (
            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
              {errors.datesAvailable}
            </p>
          )}
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
              {errors.square}
            </p>
            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
              {errors.price}
            </p>
          </div>
          <div>
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
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.square}
          </p>

          {show && (
            <div className="bg-[white] rounded-[20px] py-2">
              <label className="flex items-center px-3 pb-3 font-custom font-semibold text-[12px] text-gray-500">
                Selecciona los servicios:
              </label>
              <div className="flex w-[270px] flex-wrap gap-2 justify-center">
                {services &&
                  services.map((service) => (
                    <label
                      key={service.id}
                      className={`flex items-center w-[100px] px-2 py-1 font-custom font-semibold text-[12px] rounded-[20px] border border-solid border-[#e7e6e6] 
                      ${
                        formData.services.includes(service.id)
                          ? "bg-[#e7e6e6] border-none"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={service.id}
                        onChange={handleServiceChange}
                        className="form-checkbox h-3 w-3 text-gray-600 "
                      />
                      <span className="ml-2 text-gray-700 ">
                        {service.type}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          )}

          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.services}
          </p>

          <div className="bg-[white] rounded-[20px] py-3">
            <div className="">
              <input
                type="file"
                accept="image/*"
                name="images"
                id="images"
                onChange={handleChange}
                className="hidden"
                multiple
              />
              <label
                htmlFor="images"
                className="flex justify-center relative mx-3 px-4   rounded-lg cursor-pointer bg-slate-200 border-4 border-gray-300 z-10 hover:bg-gray-400  focus:border-blue-500 focus:outline-none"
              >
                <span className="m-2 font-custom font-semibold text-[12px]">
                  Subir foto
                </span>
              </label>
            </div>
            {formData.images.length > 0 && (
              <div className="">
                <p className="flex items-center px-3 font-custom font-semibold text-[12px] text-gray-500">
                  Previsualización de imágenes:
                </p>
                <div className="flex justify-center">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-beetwen gap-1"
                    >
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Imagen ${index + 1}`}
                          className="h-16 w-16 object-cover mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageRemove(index)}
                          className="absolute top-0 right-0 bg-gray-500 text-white font-bold py-1 px-2 rounded-full"
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
                      <span className="font-custom font-semibold text-[12px] text-gray-500">
                        Imagen {formData.images.length + index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.images}
          </p>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 ${
                disableSubmit
                  ? "bg-[transparent] text-black shadow-md"
                  : "bg-[black] text-white shadow-md"
              }`}
              disabled={disableSubmit}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HousingForm;
