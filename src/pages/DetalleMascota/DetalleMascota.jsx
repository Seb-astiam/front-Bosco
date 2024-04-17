import { NavLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { useMascotaById } from "../../Hooks/useMascotaById";
import { useUser } from "../../Hooks/useUser";


export const DetalleMascota = () => {
    const { id } = useParams();

    const data = useSelector((state) => state.storage.mascotaById);

    const User = useSelector((state) => state.storage.UserById);

    useMascotaById(id);
    useUser(data?.UserId);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 to-blue-200 flex flex-col items-center justify-center px-4 gap-2">

            <h1 className="font-custom">Mascota</h1>


            <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden font-custom">
                  
                <div className="felx items-center justify-center bg-slate-600">
                  <img className="w-[230px] h-[240px]"
                  src={data?.image} alt="Imagen de mascota" 
                  />
                </div>

                  

                  <div className="p-6 gap-1">

                  <div className="flex items-center gap-3">
                      <span className="text-gray-600 mr-2">Mi dueño es:</span>
                      <span className="text-gray-800 font-semibold">{User?.name}</span>
                      <span className="text-gray-800 font-semibold">{User?.email}</span>
                    </div>

                    <h2 className="text-3xl font-bold mb-2 text-gray-800">{data.name}</h2>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Tipo:</span>
                      <span className="text-gray-800 font-semibold">{data.type}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Edad:</span>
                      <span className="text-gray-800 font-semibold">{data.age} años</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Agresividad:</span>
                      <span className="text-gray-800 font-semibold">{data.aggressiveness ? 'Sí' : 'No'}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Género:</span>
                      <span className="text-gray-800 font-semibold">{data.genre}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Raza:</span>
                      <span className="text-gray-800 font-semibold">{data.raze}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Tamaño:</span>
                      <span className="text-gray-800 font-semibold">{data.size}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">Convivencia:</span>
                      <span className="text-gray-800 font-semibold">{data.coexistence ? 'Sí' : 'No'}</span>
                    </div>

                    <div className="gap-2">
                      <NavLink to='/solicitud-reserva' className='text-black font-custom bg-orange-300 hover:bg-orange-700 hover:text-white p-1 rounded cursor-pointer'>Back</NavLink>
                    </div>
                  </div>
                </div>

    
        </div>
    )
}
