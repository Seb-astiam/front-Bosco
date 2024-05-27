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
        <div className="h-screen mq900:h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-chocolate-300 ">

            <div className="flex mq900:my-0 flex-row mq900:flex-col w-[70%] mq900:w-[95%] mq900:max-h-full max-h-[400px] bg-white shadow-md rounded-[50px] overflow-hidden font-custom">
                  
                <div className="felx items-center justify-center bg-slate-600">
                  <img className="w-[230px] h-full"

                  src={data?.image} alt="Imagen de mascota" 
                  />
                </div>

                <div className="px-16 py-8 flex flex-col">

                      <div className="flex flex-col justify-center">
                        <span className="text-gray-700 font-bold text-[30px] mq900:text-[25px">Hola! Mi nombre es {data.name}</span>
                        <span className="text-gray-700 font-semibold text-[20px] my-1">Estos son mis datos:</span>
                      </div>
                    
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2 mt-2">Tipo:</span>
                      <span className="text-gray-700 font-semibold  mt-2">{data.type}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Edad:</span>
                      <span className="text-gray-700 font-semibold">{data.age} años</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Agresividad:</span>
                      <span className="text-gray-700 font-semibold">{data.aggressiveness ? 'Sí' : 'No'}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Género:</span>
                      <span className="text-gray-700 font-semibold">{data.genre}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Raza:</span>
                      <span className="text-gray-700 font-semibold">{data.raze}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-600 mr-2">Tamaño:</span>
                      <span className="text-gray-700 font-semibold">{data.size}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-gray-600 mr-2">Convivencia:</span>
                      <span className="text-gray-700 font-semibold">{data.coexistence ? 'Sí' : 'No'}</span>
                    </div>
                    <span className="font-semibold text-gray-700">Mi dueño es {User?.name} y podes contactarlo en {User?.email}</span>

                  </div>
                    <div className="absolute mt-8 max-w-[100px] flex justify-center items-center font-custom bg-chocolate-100 hover:bg-chocolate-200  py-2 px-4 rounded-[20px] cursor-pointer">
                          <NavLink to='/solicitud-reserva' className='text-white no-underline '>Back</NavLink>
                    </div> 
                  
                </div>
                
        </div>
    )
}
