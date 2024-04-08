import { useEffect, useState } from "react"
import axios from "axios"

export const HistorialReserva = () => {

    const email_usuario = JSON.parse(localStorage.getItem("user"));
 
    const [historial, setHistorial] = useState([])

    useEffect(() => {
        const Historial = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/reservation/allReservation/${email_usuario.email}`)


                const response = data.map((dataHousing)=> {
                    let obj;
                   return obj = { 
                    id: dataHousing.id,
                    fechaInicio: dataHousing.fechaInicio,
                    fechaFin: dataHousing.fechaFin,
                    estatus: dataHousing.estatus,
                    Housings: dataHousing.Housings
                   }
                })
                
                setHistorial(response)
                
            } catch (error) {
                console.error(error)
            }
        } 

        Historial();
    }, []);

    return (
        <div className="ml-2 mr-2 ">
        <h1 className="text-2xl text-center font-inter  my-4  py-2 rounded-lg text-white shadow-lg bg-orange-400">Historial de Reservas</h1>
        <table className="mr-3 min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="font-inter ">
              <th className="px-3 py-3 text-left bg-green-200 rounded-lg text-xs font-medium text-gray-500 uppercase ">Fecha de Inicio</th>
              <th className="px-3 py-3 text-left bg-red-200 rounded-lg text-xs font-medium text-gray-500 uppercase ">Fecha de Fin</th>
              <th className="px-3 py-3 text-left bg-orange-200 rounded-lg text-xs font-medium text-gray-500 uppercase ">Estatus</th>
              <th className="px-3 py-3 text-left bg-orange-200 rounded-lg text-xs font-medium text-gray-500 uppercase ">Title</th>
              <th className="px-3 py-3 text-left bg-orange-200 rounded-lg text-xs font-medium text-gray-500 uppercase ">price</th>
              <th className="px-3 py-3 text-left bg-orange-200 rounded-lg text-xs font-medium text-gray-500 uppercase ">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {historial.map((reserva) => (
              <tr key={reserva.id}>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.fechaInicio}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.fechaFin}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.estatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.Housings[0]?.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.Housings[0]?.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.Housings[0]?.provinces}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}