import { useState } from "react";
import Swal from "sweetalert2";
import { useMascotas } from "../../../Hooks/useMascota";
import { useSelector } from "react-redux";
import axiosJwt from "../../../utils/axiosJwt";

export const FormReserva = ({ id, hourly }) => {
  const [open, setOpen] = useState(false);

  const email_usuario = JSON.parse(localStorage.getItem("user"));

  useMascotas(email_usuario?.id);
  const pet = useSelector((state) => state.storage.MascotasUsuario);

  const mascota = pet;
  const [input, setInput] = useState({
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { value } = e.target;

    let body = {
      email_usuario: email_usuario.email,
      id_alojamiento: id,
      UserMascotumId: value,
    };
    if (hourly) {
      body = {
        ...body,
        fechaInicio: input.fechaInicio,
        horaInicio: input.horaInicio,
        horaFin: input.horaFin,
      };
    } else {
      body = {
        ...body,
        fechaInicio: input.fechaInicio,
        fechaFin: input.fechaFin,
      };
    }
    
    const camposVacios = Object.values(body).some((value) => !value);

    if (camposVacios) {
      return Swal.fire({
        title: "Error",
        text: "Hay campos vacios que faltan por llenar",
        icon: "error",
      });
    }

    try {
      const { pet } = await axiosJwt.post(
        "http://localhost:3001/reservation/newReservation",
        body
      );
      Swal.fire({
        icon: "success",
        title: pet,
        text: "Esperando aceptación",
      });

      setOpen(false);
    } catch (error) {
      return Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (hourly) {
      if (!input?.fechaInicio || !input?.horaInicio || !input?.horaFin) {
       
        return Swal.fire({
          title: "ERROR",
          text: "Te faltan llenar campos",
          icon: "error",
        });
      }
    } else {
      if (!input?.fechaInicio || !input?.fechaFin) {
        return Swal.fire({
          title: "ERROR",
          text: "Te faltan llenar campos",
          icon: "error",
        });
      }
    }
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  

  return (
    <form className="flex flex-col items-center justify-center">
      <label className="py-2 px-6 rounded-[20px] bg-white text-center flex items-center justify-center mb-4">
        <input type="date" name="fechaInicio" onChange={handleChange } className="focus:outline-none"></input>
      </label>

      {hourly ? (
        <div className="flex flex-row">
          <label className="flex w-[110px] flex-col items-center px-[15px] py-[10px] ">
            <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
              Hora de inicio
            </a>
            <a className="bg-white py-2 px-6 rounded-[20px] items-center flex justify-center">
            <input
              type="number"
              name="horaInicio"
              id="horaInicio"
              onChange={handleChange}
              value={input.horaInicio}
              min={1}
              max={input.horaFin ? input.horaFin - 1 : 23}
              step={1}
              className="outline-none w-10"
            />
            </a>
          </label>
          <label className="flex w-[110px] flex-col items-center px-[15px] py-[10px]">
            <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
              Hora de fin
            </a>
            <a className="bg-white py-2 px-6 rounded-[20px] items-center flex justify-center">
            <input
              type="number"
              name="horaFin"
              id="horaFin"
              onChange={handleChange}
              value={input.horaFin}
              min={parseInt(input.horaInicio) + 1}
              step={1}
              max={24}
              className="outline-none w-10"
            />
            </a>
          </label>
        </div>
      ) : (
        <label className="py-2 px-6 rounded-[20px] bg-white text-center flex items-center justify-center mb-4">
          <input type="date" name="fechaFin" onChange={handleChange} className="focus:outline-none"></input>
        </label>
      )}

      <button
        className="cursor-pointer border-none py-3 px-6 font-semibold text-[15px] mt-2 text-white  bg-chocolate-100 flex-1 rounded-[50px] flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-chocolate-200"
        onClick={handleClick}
        disabled={open}
      >
        Enviar reserva
      </button>

      {open && (
        <div className="fixed inset-0 z-10 mq900:overflow-auto  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white mq900:overflow-auto h-full mq900:max-w-full px-5 pt-0 pb-4 rounded flex flex-col justify-center items-center">
            <div className="mq900:mt-4 flex flex-row w-full items-center justify-between">
            <button onClick={() => setOpen(false)} className="  cursor-pointer flex items-center justify-start bg-whiteseñales rounded-[50px] px-3 py-3 max-h-[35px] mq900:ml-3">
            ✖
            </button>
            <h1 className=" font-custom text-[25px] text-gray-700 mq900:mr-3">¿Qué mascota alojarás?</h1>
            </div>
            <div className="flex mq900:flex-col gap-5 mq900:overflow-auto ">
              {mascota?.map((pet) => {
                return (
                  <div className="mq900:overflow-auto  max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden font-custom">
                    <div className="flex items-center justify-center bg-slate-600">
                      <img
                        className="w-[230px] h-[220px]"
                        src={
                          pet.image
                        }
                        alt="Imagen de mascota"
                      />
                    </div>
                    <div className="px-6 py-1">
                      <h2 className="text-3xl font-bold mb-2 text-gray-700">
                        {pet.name}
                      </h2>
                      <div className="flex items-center mb-2 text-[15px]">
                        <span className="text-gray-500 mr-2">Tipo:</span>
                        <span className="text-gray-700 font-semibold">
                          {pet.type}
                        </span>
                      </div>
                      <div className="flex items-center mb-2 text-[15px]">
                        <span className="text-gray-500 mr-2">Edad:</span>
                        <span className="text-gray-700 font-semibold">
                          {pet.age} años
                        </span>
                      </div>
                      <div className="flex items-center mb-2 text-[15px]">
                        <span className="text-gray-500 mr-2">Agresividad:</span>
                        <span className="text-gray-700 font-semibold">
                          {pet.aggressiveness ? "Sí" : "No"}
                        </span>
                      </div>
                      <div className="flex items-center mb-2 text-[15px]">
                        <span className="text-gray-500 mr-2">Género:</span>
                        <span className="text-gray-700 font-semibold">
                          {pet.genre}
                        </span>
                      </div>
                      <div className="flex items-center mb-2 text-[15px]">
                        <span className="text-gray-500 mr-2">Raza:</span>
                        <span className="text-gray-700 font-semibold">
                          {pet.raze}
                        </span>
                      </div>
                      <div className="flex items-center mb-2 text-[15px]">
                        <span className="text-gray-500 mr-2">Tamaño:</span>
                        <span className="text-gray-700 font-semibold">
                          {pet.size}
                        </span>
                      </div>
                      <div className="flex items-center text-[15px]">
                        <span className="text-gray-500 mr-2">Convivencia:</span>
                        <span className="text-gray-700 font-semibold">
                          {pet.coexistence ? "Sí" : "No"}
                        </span>
                      </div>

                      <button
                        onClick={handleSubmit}
                        value={pet.id}
                        className="text-white mt-4 font-semibold cursor-pointer px-4 py-2 bg-chocolate-100 hover:bg-chocolate-200 rounded-[20px]"
                      >
                        Selecionar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
