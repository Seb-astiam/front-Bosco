import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { ValidateFormdata } from "./validate";
import { useLocationProvincias } from "../../../Hooks/useLocationProvincias";
import { useServices } from "../../../Hooks/useServices";
import { useSelector } from "react-redux";
import useCities from "../../../Hooks/useCities";
import bosco from "../../../assets/bosco-logo.jpeg";

const HousingForm = () => {
  useServices();
  useLocationProvincias();
  useCities();
  const provincias = useSelector((state) => state.storage.AllProvinces);
  const services = useSelector((state) => state.storage.AllService);

  const email = JSON.parse(localStorage.getItem("user")).email;
  const [formData, setFormData] = useState({
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
  //para poder ver si se estaba actualizando el estado correctamente.

  // manejo del boton de submit
  const [disableSubmit, setDisableSubmit] = useState(true);
  // const errorMessages = Object.values(errors);
  // setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
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
        // Si el campo es "images", agregamos cada archivo al FormData
        value.forEach((image) => formDataToSend.append("images", image));
      } else {
        // Para otros campos del formulario, simplemente los agregamos al FormData
        formDataToSend.append(key, value);
      }
    });

    console.log(formDataToSend);

    try {
      const response = await axios.post(
        `http://localhost:3001/profileHousing/register?email=${email}`,
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
    <div className="flex justify-center items-center h-[900px] w-[100%] my-[50px]">
      <div className="h-[100%] w-[50%] rounded-bl-[20px] rounded-tl-[20px] max-w-[400px] ">
        <img
          src={bosco}
          alt="bosco"
          className="rounded-bl-[20px] rounded-tl-[20px] w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center px-[5%] justify-center rounded-br-[20px] rounded-tr-[20px] h-[100%] w-[50%] !bg-[#FEB156] max-w-[400px]">
        <h2 className="font-custom font-extrabold">Registrar alojamiento</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center my-[0%] px-[5%] justify-center rounded-br-[20px] rounded-tr-[20px] w-[100%]"
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

          <div className="flex flex-row">
            <label
              htmlFor="datesAvailable"
              className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-bl-[20px] rounded-tl-[20px]"
            >
              <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                {" "}
                Fecha de inicio{" "}
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
              className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-br-[20px] rounded-tr-[20px]"
            >
              <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                {" "}
                Fecha de fin{" "}
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
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.datesAvailable}
          </p>
          <div className="flex flex-row justify-between  gap-4">
            <label
              htmlFor="square"
              className="flex items-center px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500 "
            >
              {" "}
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
              {" "}
              $/hora
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
                <option value="Cabaña">Cabaña</option>
                <option value="Hotel">Hotel</option>
                <option value="Casa Rural">Casa Rural</option>
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
                      className={`flex items-center w-[100px] px-2 py-1 font-custom font-semibold text-[12px] rounded-[20px] border border-solid border-[#e7e6e6] ${
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
            <label
              htmlFor="images"
              className="flex items-center px-3 pb-3 font-custom font-semibold text-[12px] text-gray-500"
            >
              Imágenes
            </label>
            <input
              type="file"
              accept="image/*"
              name="images"
              id="images"
              onChange={handleChange}
              className="ml-2 text-gray-700"
              multiple
            />
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
