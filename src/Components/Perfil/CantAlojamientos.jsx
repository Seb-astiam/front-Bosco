import { useEffect, useState } from "react"
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ModalAlojamiento } from "./modalAlojamientos";

export const CantAlojamiento = ({ email }) => {
    const [alojamientoUsuario, setAlojamientoUsuario] = useState([])

    useEffect(() => {
        const alojamientos = async () => {
            try {
                const { data } = await axios.get(`/user/${email}`)
                const housings = data.Housings

                setAlojamientoUsuario(housings)
            } catch (error) {
                console.error("Algo falló en la petición a mi Backend", error);
            }
        }

        alojamientos();
    }, [email])

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
      }

    function closeModal() {
    setIsOpen(false);
    }

    return (
        <div className="w-full h-full items-center grid grid-cols-2">
            
                {alojamientoUsuario?.map((alojamiento, index) => {
                    return (
                        <div className="flex flex-col h-80 aspect-video border border-black border-solid ml-5 cursor-pointer shadow-custom-shadow" 
                        key={index}
                        onClick={openModal}
                        >
                            <img src={alojamiento.images[0]} className="w-full h-full"/>

                            <div className="absolute bg-black bg-opacity-50  ">
                                <h4 className="m-5 font-custom font-extralight">{alojamiento.title}</h4>
                            </div>
                            <div className="relative bg-black bg-opacity-50 flex h-12 items-center justify-start p-2 top-[-63px] font-custom gap-3 font-extralight">
                                <FaLocationDot />
                                <p>{alojamiento.cities},</p>
                                <p>{alojamiento.provinces}</p>
                            </div>
                        </div>
                    )
                })}

                <Link 
                    className="h-80 aspect-video border-2 border-black 
                    border-dashed bg-opacity-100 font-custom ml-5 flex 
                    items-center flex-col justify-center no-underline text-black
                    shadow-custom-shadow"
                    to="/ProfileHousing"
                
                >
                    <IoAddCircleOutline className="w-14 h-14"/>
                    <h4>Añadir Alojamiento</h4>
                </Link>

                <ModalAlojamiento  closeModal={closeModal} modalIsOpen={modalIsOpen}/>
        </div>

            
    )
}