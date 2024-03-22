import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { ValidateFormdata } from "./validate";
import { useLocationProvincias } from "../../../Hooks/useLocationProvincias";
import { useServices } from "../../../Hooks/useServices";
import { useSelector } from "react-redux";

const HousingForm = () => {
  useServices();
  useLocationProvincias();
  const provincias = useSelector((state) => state.storage.AllLocation);
  const servicesA = useSelector((state) => state.storage.AllService);

  const email = "bosco@gmail.com";
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    datesAvailable: "",
    datesEnd: "",
    price: "",
    accommodationType: "",
    services: [],
    square: 0,
    images: [],
  });
  //para poder ver si se estaba actualizando el estado correctamente.

  useEffect(() => {
    // aca renderizo los servicios desde el json mientras no tenga la ruta
    console.log(formData);
  }, [formData]);

  // manejo del boton de submit
  const [disableSubmit, setDisableSubmit] = useState(true);
  // const errorMessages = Object.values(errors);
  // setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));

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
    const errorMessages = Object.values(errors);
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
        clearFormData();
      }

      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const clearFormData = () => {
    setFormData({
      title: "",
      location: "",
      datesAvailable: "",
      datesEnd: "",
      price: "",
      accommodationType: "",
      services: [],
      square: 0,
      images: [],
    });
  };

  return (
    <div className="max-w-lg mx-auto my-8 ">
      <form
        onSubmit={handleSubmit}
        className="bg-naranjaForm shadow-md rounded-[20px] flex flex-col px-[10%] rounded-br-[20px] rounded-tr-[20px] w-[100%] "
        encType="multipart/form-data"
      >
        <h2 className="font-custom font-extrabold">Registrar alojamiento</h2>

        <div className="mb-4 relative">
          <label
            htmlFor="title"
            className="flex flex-grow px-[10px] py-[5px] bg-[white] rounded-[20px]"
          >
            <box-icon name="home" title="Nombre del alojamiento"></box-icon>
            <input
              placeholder="Nombre del alojamiento"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-[80%] ${errors.title ? "border-red-500" : ""
                }`}
            />
            {!errors.title && formData.title && (
              <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-green-500">
                <span role="img" aria-label="check">
                  {" "}
                  ✔️{" "}
                </span>
              </div>
            )}
          </label>


          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="location"
            className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
          >
            <box-icon name="map" title="Ubicación"></box-icon>

            <select
              name="location"
              id="location"
              onChange={handleChange}
              value={formData.location}
              className={`border-none appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.location ? "border-red-500" : ""
                }`}
            >
              <option value="">Ubicación</option>
              {provincias.map((provincia) => {
                return (
                  <option value={provincia.nombre} key={provincia.id}>
                    {provincia.nombre}
                  </option>
                );
              })}
            </select>
          </label>
          {!errors.location && formData.location && (
            <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-green-500">
              <span role="img" aria-label="check">
                ✔️
              </span>
            </div>
          )}
          {errors.location && (
            <span className="text-red-500 text-sm italic">
              {errors.location}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="datesAvailable"
            className="flex items-center relative px-[10px] bg-[white] rounded-[20px]"
          >
            <box-icon name="calendar-alt" title="Fecha de inicio"></box-icon>

            {/* <p className="m-[0px] w-[180px]">

              Fecha de inicio
            </p> */}
            <input
              placeholder="Fecha inicio"
              type="date"
              name="datesAvailable"
              id="datesAvailable"
              onChange={handleChange}
              value={formData.datesAvailable}
              max={formData.datesEnd}
              className={`appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.datesAvailable ? "border-red-500" : ""
                }`}
            />
          </label>
          {!errors.datesAvailable && formData.datesAvailable && (
            <div className="cursor-default mr-3 text-green-500">
              <span role="img" aria-label="check" title="Todo correcto">
                ✔️
              </span>
            </div>
          )}
          {errors.datesAvailable && (
            <p className="text-red-500 text-xs italic">
              {errors.datesAvailable}
            </p>
          )}
        </div>
        <div className="mb-4">



          <label
            htmlFor="datesEnd"
            className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
          >
            <box-icon name="calendar-x" title="Fecha Fin"></box-icon>

            {/* <p className="m-[0px] w-[180px]">

              Fecha Fin
            </p> */}
            <input
              type="date"
              name="datesEnd"
              id="datesEnd"
              onChange={handleChange}
              value={formData.datesEnd}
              min={formData.datesAvailable}
              className={`appearance-none border-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.datesEnd ? "border-red-500" : ""
                }`}
            />
          </label>
          {!errors.datesEnd && formData.datesEnd && (
            <div className=" mr-3 text-green-500">
              <span role="img" aria-label="check">
                {" "}
                ✔️{" "}
              </span>
            </div>
          )}
          {errors.datesEnd && (
            <p className="text-red-500 text-xs italic">{errors.datesEnd}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="square"
            className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
          >
            <box-icon type='solid' title="Cantidad de plazas" name='cat'></box-icon>

            {/* <p className="m-[0px] w-[180px]">
              Cantidad de plazas
            </p> */}
            <input
              placeholder="Cantidad de plazas"
              type="number"
              name="square"
              id="square"
              onChange={handleChange}
              value={formData.square}
              className={`appearance-none border-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.square ? "border-red-500" : ""
                }`}
            />
          </label>
          {!errors.square && formData.square > 0 && (
            <div className="mr-3 text-green-500">
              <span role="img" aria-label="check">
                ✔️
              </span>
            </div>
          )}
          {errors.square && (
            <p className="text-red-500 text-xs italic">{errors.square}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
          >
            <box-icon name="money" title="Precio/Hora"></box-icon>

            {/* <p className="m-[0px] w-[180px]">

              Precio/hora
            </p> */}
            <input
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
              value={formData.price}
              className={`appearance-none border-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? "border-red-500" : ""
                }`}
            />
          </label>
          {!errors.price && formData.price && (
            <div className=" mr-3 text-green-500">
              <span role="img" aria-label="check">
                ✔️
              </span>
            </div>
          )}
          {errors.price && (
            <p className="text-red-500 text-xs italic">{errors.price}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="accommodationType"
            className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
          >             
           <box-icon name='building-house' title="Tipo de alojamiento"></box-icon>

            {/* <p className="m-[0px] w-[180px]">
              Tipo de Alojamiento
            </p> */}

            <select
              name="accommodationType"
              id="accommodationType"
              onChange={handleChange}
              value={formData.accommodationType}
              className={`appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.accommodationType ? "border-red-500" : ""
                }`}
            >
              <option value="">Seleccionar tipo de alojamiento</option>
              <option value="Cabaña">Cabaña</option>
              <option value="Hotel">Hotel</option>
              <option value="Casa Rural">Casa Rural</option>
            </select>
          </label>
          {!errors.accommodationType && formData.accommodationType && (
            <div className=" mr-3 text-green-500">
              <span role="img" aria-label="check">
                ✔️
              </span>
            </div>
          )}
          {errors.accommodationType && (
            <p className="text-red-500 text-xs italic">
              {errors.accommodationType}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Servicios
          </label>
          <div
            className={`appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.services ? "border-red-500" : ""
              }`}
          >
            <div>
              {servicesA &&
                servicesA.map((service) => (
                  <label
                    key={service.id}
                    className="inline-flex items-center ml-4"
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
            </div>
          </div>

          <div className="mt-2">
            {formData.services.map((serviceId, index) => {
              console.log("Selected service formdata:", formData.services);
              const selectedService = servicesA.find(
                (service) => service.id === serviceId
              );
              console.log("Selected service:", selectedService);
              return (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  {selectedService ? selectedService.type : ""}
                </span>
              );
            })}
          </div>
          {!errors.services && formData.services.length > 0 && (
            <div className=" mr-3 text-green-500">
              <span role="img" aria-label="check">
                ✔️
              </span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Imágenes (mínimo 3)
          </label>
          <input
            type="file"
            accept="image/*"
            name="images"
            id="images"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            multiple
          />
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
                        src={URL.createObjectURL(image)}
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

          {errors.images && (
            <p className="text-red-500 text-xs italic">{errors.images}</p>
          )}
        </div>
        <div className="">
        </div>
          <button
            type="submit"
            className="font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 bg-[black] text-white shadow-md"
            disabled={disableSubmit}
          >
            Enviar
          </button>
      </form>
    </div>
  );
};

export default HousingForm;
