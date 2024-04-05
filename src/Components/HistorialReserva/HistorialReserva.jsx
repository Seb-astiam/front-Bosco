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
        <div>
        <h1 className="text-2xl font-bold mb-4">Historial de Reservas</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Inicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Fin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
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