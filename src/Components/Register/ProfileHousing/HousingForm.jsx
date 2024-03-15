import React, { useState, useEffect } from "react";
import axios from "axios";
import servicesData from "./Services.json";
import { ValidateFormdata } from "./validate";

const HousingForm = () => {
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
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      services: checked
        ? [...prevData.services, value]
        : prevData.services.filter((service) => service !== value),
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
        value.forEach((image) => formDataToSend.append("images", image));
      } else if (key === "services" || key === "datesAvailable") {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axios.post("URL_DEL_BACKEND", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Manejar la respuesta del backend aquí
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        encType="multipart/form-data"
      >
        <h2 className="text-lg font-bold mb-4">Registrar Alojamiento</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre del Alojamiento
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {!errors.title && formData.title && (
              <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )}
          </div>
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="location"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ubicación
          </label>
          <input
            type="text"
            name="location"
            id="location"
            onChange={handleChange}
            value={formData.location}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.location ? "border-red-500" : ""
            }`}
          />
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
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Fechas Inicio
          </label>
          <input
            type="date"
            name="datesAvailable"
            id="datesAvailable"
            onChange={handleChange}
            value={formData.datesAvailable}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.datesAvailable ? "border-red-500" : ""
            }`}
          />
          {!errors.datesAvailable && formData.datesAvailable && (
            <div className=" mr-3 text-green-500">
              <span role="img" aria-label="check">
                ✔️
              </span>
            </div>
          )}
          {errors.datesAvailable && (
            <p className="text-red-500 text-xs italic">
              {errors.datesAvailable}
            </p>
          )}

          <label
            htmlFor="datesEnd"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Fecha Fin
          </label>
          <input
            type="date"
            name="datesEnd"
            id="datesEnd"
            onChange={handleChange}
            value={formData.datesEnd}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.datesEnd ? "border-red-500" : ""
            }`}
          />
          {!errors.datesEnd && formData.datesEnd && (
            <div className=" mr-3 text-green-500">
              <span role="img" aria-label="check">
                ✔️
              </span>
            </div>
          )}
          {errors.datesEnd && (
            <p className="text-red-500 text-xs italic">{errors.datesEnd}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Cantidad de Plazas
          </label>
          <input
            type="number"
            name="square"
            id="square"
            onChange={handleChange}
            value={formData.square}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.square ? "border-red-500" : ""
            }`}
          />
          {!errors.square && formData.square >0 && (
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
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Precio/hora
          </label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
            value={formData.price}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.price ? "border-red-500" : ""
            }`}
          />
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
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tipo de Alojamiento
          </label>
          <select
            name="accommodationType"
            id="accommodationType"
            onChange={handleChange}
            value={formData.accommodationType}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.accommodationType ? "border-red-500" : ""
            }`}
          >
            <option value="">Seleccionar Tipo de Alojamiento</option>
            {/* Agrega opciones de tipo de alojamiento aquí */}
            <option value="Cabaña">Cabaña</option>
            <option value="Hotel">Hotel</option>
            <option value="Casa Rural">Casa Rural</option>
          </select>
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
          <div  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.services? "border-red-500" : ""
            }`}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="services"
                value="aseo"
                onChange={handleServiceChange}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Aseo</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                name="services"
                value="paseo diario"
                onChange={handleServiceChange}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Paseo diario</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                name="services"
                value="baño"
                onChange={handleServiceChange}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">Baño</span>
            </label>
          </div>
          <div className="mt-2">
            {formData.services.map((service, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {service}
              </span>
            ))}
          </div>
          {!errors.services && formData.services && (
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
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default HousingForm;