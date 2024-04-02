import { useEffect, useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";

export const SolicitudReserva = () => {

    const email_usuario = JSON.parse(localStorage.getItem("user"));

    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        const solicitud = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/reservation/reservations/${email_usuario.id}`);

                 

                const response = data.flat().map((dataHousing)=> {
                    let obj;
                   return obj = { 
                    id: dataHousing.id,
                    fechaInicio: dataHousing.fechaInicio,
                    fechaFin: dataHousing.fechaFin,
                    estatus: dataHousing.estatus,
                    Housings: dataHousing.Housings[0]?.title
                   }
                })

                setSolicitudes(response)
                
            } catch (error) {
                console.error(error)
            }
        } 

        solicitud();
    }, []);

    const handleClick = (e) => {

        const { name } = e.target 

        const modificarReserva = async (estado) => {
            try {
                const body = {
                    status: estado, 
                    id_reserva: name
                }
    
                await axios.put(`http://localhost:3001/reservation/estadoReserva`, body)

                setTimeout(() => {
                    window.location.reload(true);
                }, 1500); 
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Cagamos",
                    text: error.response.data,
                  });
            }
        }

        Swal.fire({
            title: "Confirmas esta reserva?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            denyButtonText: `Rechazar`,
            cancelButtonText: 'Cerrar'
          }).then((result) => {
            if (result.isConfirmed) {
                modificarReserva('Success')
            } else if (result.isDenied) {
                modificarReserva('Reject')
            }
          });

        
    }

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Inicio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Fin</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Alojamiento</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {solicitudes.map((reserva) => (
                    <tr key={reserva.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{reserva.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{reserva.fechaInicio}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{reserva.fechaFin}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{reserva.estatus}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><button onClick={handleClick} className="cursor-pointer" name={reserva.id}>{reserva.Housings}</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}