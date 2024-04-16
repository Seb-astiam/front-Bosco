import { useEffect, useState } from "react";
// import axios from 'axios'
import axiosJwt from "../../utils/axiosJwt";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { io } from "socket.io-client";
import { ClassNames } from "@emotion/react";

export const SolicitudReserva = () => {
  const email_usuario = JSON.parse(localStorage.getItem("user"));
  const [solicitudes, setSolicitudes] = useState([]);
  const socket = io.connect("http://localhost:3001");

  useEffect(() => {
    const solicitud = async () => {
      try {
        const { data } = await axiosJwt(
          `http://localhost:3001/reservation/reservations/${email_usuario.id}`
        );
        const response = data.flat().map((dataHousing) => {
          let obj;
          return (obj = {
            id: dataHousing.id,
            fechaInicio: dataHousing.fechaInicio,
            fechaFin: dataHousing.fechaFin,
            horaInicio: dataHousing.horaInicio,
            horaFin: dataHousing.horaFin,
            estatus: dataHousing.estatus,
            Housings: dataHousing.Housings[0]?.title,
            UserEmail: dataHousing.Users[0]?.email,
            UserName: dataHousing.Users[0]?.name,
            UserId: dataHousing.Users[0]?.id,
            idMascota: dataHousing.UserMascotumId,
          });
        });

        setSolicitudes(response);
      } catch (error) {
        console.error(error);
      }
    };

    solicitud();
  }, []);

  const handleClick = (e) => {
    const { name, value } = e.target;

    const modificarReserva = async (estado) => {
      try {
        const body = {
          status: estado,
          id_reserva: name,
        };

        await axiosJwt.put(
          `http://localhost:3001/reservation/estadoReserva`,
          body
        );

        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Algo salio mal",
          text: error.response.data,
        });
      }
    };

    Swal.fire({
      title: "Confirmas esta reserva?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: `Rechazar`,
      cancelButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        modificarReserva("Success");
        const usuario = solicitudes.find((user) => user.UserEmail === value);
        socket.emit("notificacion", "Solicitud fue aceptada", usuario);
      } else if (result.isDenied) {
        modificarReserva("Reject");
      }
    });
  };

  const [openReservas, setOpenReservas] = useState({});

  const toggleDropdown = (reservaId) => {
    setOpenReservas({
      ...openReservas,
      [reservaId]: !openReservas[reservaId] 
    });
  };

  useEffect(() => {
    const initialOpenReservas = solicitudes.reduce((acc, reserva) => {
      return { ...acc, [reserva.id]: false };
    }, {});
    
    setOpenReservas(initialOpenReservas);
  }, [solicitudes]);

  return (
    <div className="mt-2">
      <a className="font-custom ml-3 text-chocolate-200 font-bold mq900:text-[25px] text-[35px]">Historial de Solicitudes</a>
      <div className="w-full font-custom flex flex-col m-[10px]">
        <div className="w-[95%] flex justify-evenly items-center">
         
            <a className="mq900:hidden w-[20%] p-4 py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
              Check-In
            </a>
            <a className="mq900:hidden w-[20%] px-4 py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
              Check-Out
            </a>
            <a className=" px-4  py-2 w-[10%] mq900:w-[25%] text-left  font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
              Estado
            </a>
            <a className="px-4 py-2 w-[15%] mq900:w-[45%]  text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
              Alojamiento
            </a>
            <a className="px-4 py-2 w-[15%] mq900:w-[25%] text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px] mq900:mr-8">
              Cliente
            </a>
            <a className="mq900:hidden px-4 w-[15%] py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
              Email
            </a>
          
        </div> 
        <div className="flex flex-col  my-3 text-gray-700 w-[95%]">
          
          {solicitudes.map((reserva) => (
            <div key={reserva.id} className="flex flex-col ">
              <div className=" flex flex-row items-center text-start">
              <a className=" mq900:hidden px-2 py-4 w-[20%]" >
              { reserva.horaInicio !== null
                ? `${reserva.fechaInicio}, ${reserva.horaInicio}hs`
                : `${reserva.fechaInicio}`}
              </a>
              <a className=" mq900:hidden px-2 py-4 w-[20%] ">
              { reserva.horaFin !== null
                ? `${reserva.fechaInicio}, ${reserva.horaFin}hs`
                : `${reserva.fechaFin}`}
              </a>
              <a 
                className={`px-2 py-4 mq900:w-[25%] w-[10%]  ${
                reserva.estatus === 'Pending'
                  ? 'text-yellow-500'
                  : reserva.estatus === 'Success'
                  ? 'text-green-500'
                  : reserva.estatus === 'Reject'
                  ? 'text-red-500'
                  : ''
              }`}>
              {reserva.estatus}
              </a>
              <a className="px-2 py-4 mq900:w-[35%] w-[15%]">
                <button
                  onClick={handleClick}
                  className=" py-1 cursor-pointer font-custom text-sm bg-transparent text-gray-700 hover:bg-gray-100 hover:rounded-[20px]"
                  value={reserva.UserEmail}
                  name={reserva.id}
                >
                  {reserva.Housings}
                </button>
              </a>
              <a className="px-2 py-4 mq900:w-[25%] w-[15%]">
                <NavLink to={`/detail-mascota/${reserva.idMascota}`} className='no-underline hover:underline'> 
                  {reserva.UserName}
                </NavLink>
              </a>
              
              <a className="mq900:hidden px-2 py-4 w-[15%]">
                {reserva.UserEmail}
              </a>
              <a value= {reserva.id} className="mq900:block mq1300:hidden mq1650:hidden" onClick={() => toggleDropdown(reserva.id)}>
              { openReservas[reserva.id]? `↓` : `↑` }
              </a>
              </div>
              
              { openReservas[reserva.id] && (
                
                  <div className="py-1 flex nowrap w-full">
                    <div className="flex flex-col">
                      <a className="px-4 py-2 text-left font-medium text-cantaloupe ">
                        Check-In
                      </a>
                      <a className="px-4 py-2 text-left font-medium text-cantaloupe ">
                      Check-out
                    </a>
                    <a className="px-4 py-2 text-left font-medium text-cantaloupe ">
                          Email
                      </a>
                      
                    </div>
                    <div className="flex flex-col">
                    <a className="px-4 py-2 hover:bg-gray-100 ">
                        { reserva.horaInicio !== null
                        ? `${reserva.fechaInicio}, ${reserva.horaInicio}hs`
                        : `${reserva.fechaInicio}`}
                      </a>
                    
                    <a className="px-4 py-2 hover:bg-gray-100 ">
                      { reserva.horaFin !== null
                      ? `${reserva.fechaInicio}, ${reserva.horaFin}hs`
                      : `${reserva.fechaFin}`}
                    </a>
                    <a className="px-4 py-2 hover:bg-gray-100 ">
                        {reserva.UserEmail}
                      </a>
                    </div>
                   
                  </div>
                  
              )}
            </div>
          ))}
          
        </div>
        
      </div>
      </div>
    
  );
};



