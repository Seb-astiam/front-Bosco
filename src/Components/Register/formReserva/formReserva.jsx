import { useState } from "react";
import Swal from "sweetalert2";
import "boxicons";
import { useMascotas } from "../../../Hooks/useMascota";
import { useSelector } from "react-redux";
import axiosJwt from "../../../utils/axiosJwt";
import { useNavigate } from "react-router";

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
        "/reservation/newReservation",
        body
      );
      Swal.fire({
        icon: "success",
        title: pet,
        text: "Esperando aceptación",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ir a Historial?"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/historial-reservas");
        }
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

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if(mascota.length === 0) {
      Swal.fire({
        title: "Atencion!",
        text: "No tienes mascotas Registradas?",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Registrar Mascota"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/formMascota");
        }
      });
    }

    if (hourly) {
      if (!input?.fechaInicio || !input?.horaInicio || !input?.horaFin) {
        console.log("aca");
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
    <form className="flex flex-col items-center justify-center gap-8">
      <label className="w-64 h-10 text-center flex items-center justify-center gap-5">
        <box-icon name="calendar-edit"></box-icon>
        <input type="date" name="fechaInicio" onChange={handleChange}></input>
      </label>

      {hourly ? (
        <div className="flex flex-row">
          <label className="flex w-[110px] flex-col items-center px-[15px] py-[10px] ">
            <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
              Hora de inicio
            </a>
            <input
              type="number"
              name="horaInicio"
              id="horaInicio"
              onChange={handleChange}
              value={input.horaInicio}
              min={0}
              max={input.horaFin}
              step={1}
              className="outline-none w-12"
            />
          </label>
          <label className="flex w-[110px] flex-col items-center px-[15px] py-[10px] ">
            <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
              Hora de fin
            </a>
            <input
              type="number"
              name="horaFin"
              id="horaFin"
              onChange={handleChange}
              value={input.horaFin}
              min={input.horaInicio}
              step={1}
              max={24}
              className="outline-none w-12"
            />
          </label>
        </div>
      ) : (
        <label className="w-64 h-10 text-center flex items-center justify-center gap-5">
          <box-icon name="calendar-edit"></box-icon>
          <input type="date" name="fechaFin" onChange={handleChange}></input>
        </label>
      )}

      <button
        className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]"
        onClick={handleClick}
        disabled={open}
      >
        Enviar reserva
      </button>

      {open && mascota.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-5 rounded flex flex-col justify-center items-center">
            <button onClick={() => setOpen(false)} className="cursor-pointer">
              X
            </button>
            <h1 className="font-custom">Cual mascota alojaras?</h1>
            <div className="flex gap-5">
              {mascota?.map((pet) => {
                return (
                  <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden font-custom">
                    <div className="felx items-center justify-center bg-slate-600">
                      <img
                        className="w-[230px] h-[240px]"
                        src={
                          pet.image
                        }
                        alt="Imagen de mascota"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-3xl font-bold mb-2 text-gray-800">
                        {pet.name}
                      </h2>
                      <div className="flex items-center mb-2">
                        <span className="text-gray-600 mr-2">Tipo:</span>
                        <span className="text-gray-800 font-semibold">
                          {pet.type}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-gray-600 mr-2">Edad:</span>
                        <span className="text-gray-800 font-semibold">
                          {pet.age} años
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-gray-600 mr-2">Agresividad:</span>
                        <span className="text-gray-800 font-semibold">
                          {pet.aggressiveness ? "Sí" : "No"}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-gray-600 mr-2">Género:</span>
                        <span className="text-gray-800 font-semibold">
                          {pet.genre}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-gray-600 mr-2">Raza:</span>
                        <span className="text-gray-800 font-semibold">
                          {pet.raze}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-gray-600 mr-2">Tamaño:</span>
                        <span className="text-gray-800 font-semibold">
                          {pet.size}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Convivencia:</span>
                        <span className="text-gray-800 font-semibold">
                          {pet.coexistence ? "Sí" : "No"}
                        </span>
                      </div>

                      <button
                        onClick={handleSubmit}
                        value={pet.id}
                        className="text-gray-800 font-semibold cursor-pointer p-2 bg-orange-500 hover:bg-pink-100"
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
