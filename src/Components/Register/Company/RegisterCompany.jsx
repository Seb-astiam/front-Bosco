import React, { useState, useEffect } from "react";
import axios from "axios";
import { ValidateFormdata } from "./validate";

const RegistroEmpresa = () => {
  const [empresa, setEmpresa] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {
    console.log(empresa);
  }, [empresa]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      [name]: value,
    }));

    const validationErrors = ValidateFormdata({
      ...empresa,
      [name]: value,
    });

    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const validationErrors = ValidateFormdata(empresa);
    setErrors(validationErrors);

    
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post("URL_DEL_BACKEND", empresa);
        console.log("Registro exitoso");
       
      } catch (error) {
        console.error("Error al registrar la empresa:", error);
        
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-lg font-bold mb-4">Registrar Empresa</h2>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre de la Empresa
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={empresa.nombre}
            onChange={handleChange}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.nombre ? "border-red-500" : ""
              }`}
            />
            {!errors.nombre && empresa.nombre && (
              <div className=" mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={empresa.email}
            onChange={handleChange}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {!errors.email && empresa.email && (
              <div className=" mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )}
        </div>

        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={empresa.telefono}
            onChange={handleChange}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.telefono ? "border-red-500" : ""
              }`}
            />
            {!errors.telefono && empresa.telefono && (
              <div className=" mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )}
        </div>

        <div className="mb-4">
          <label htmlFor="direccion" className="block text-gray-700 text-sm font-bold mb-2">
            Dirección
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={empresa.direccion}
            onChange={handleChange}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.direccion ? "border-red-500" : ""
              }`}
            />
            {!errors.direccion && empresa.direccion && (
              <div className=" mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Registrar Empresa
        </button>
      </form>
    </div>
  );
};

export default RegistroEmpresa;
