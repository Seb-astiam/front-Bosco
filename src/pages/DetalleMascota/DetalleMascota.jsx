import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'


export const DetalleMascota = () => {
    const { id } = useParams();

    const [mascota, setMascota] = useState([])

    useEffect(() => {

        const axiosData = async () => {

            try {
                const { data } = await axios(`http://localhost:3001/allMascotas/${id}`);
                setMascota(data)
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: error.response.data,
                    icon: "error"
                  });
            }
        }

        axiosData();
    }, [id])




    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4 gap-2">
            {mascota?.map((pet) => {
                return  <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <img className="w-full h-64 object-cover object-center" src={pet.image} alt={`Imagen de ${pet.name}`} />
                  <div className="p-6">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">{pet.name}</h2>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Tipo:</span>
                      <span className="text-gray-800 font-semibold">{pet.type}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Edad:</span>
                      <span className="text-gray-800 font-semibold">{pet.age} años</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Agresividad:</span>
                      <span className="text-gray-800 font-semibold">{pet.aggressiveness ? 'Sí' : 'No'}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Género:</span>
                      <span className="text-gray-800 font-semibold">{pet.genre}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Raza:</span>
                      <span className="text-gray-800 font-semibold">{pet.raze}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Tamaño:</span>
                      <span className="text-gray-800 font-semibold">{pet.size}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">Convivencia:</span>
                      <span className="text-gray-800 font-semibold">{pet.coexistence ? 'Sí' : 'No'}</span>
                    </div>
                  </div>
                </div>
            })}
        </div>
    )
}