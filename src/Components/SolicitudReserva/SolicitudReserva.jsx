import { useEffect, useState } from "react";
// import axios from 'axios'
import axiosJwt from "../../utils/axiosJwt";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { io } from "socket.io-client";

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

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Inicio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Fin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hora de Inicio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hora de Fin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estatus
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre Alojamiento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {solicitudes.map((reserva) => (
            <tr key={reserva.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.fechaInicio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.fechaFin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.horaInicio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{reserva.horaFin}</td>
              <td className="px-6 py-4 whitespace-nowrap">{reserva.estatus}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={handleClick}
                  className="cursor-pointer"
                  value={reserva.UserEmail}
                  name={reserva.id}
                >
                  {reserva.Housings}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <NavLink to={`/detail-mascota/${reserva.idMascota}`}>
                  {reserva.UserName}
                </NavLink>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.UserEmail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
