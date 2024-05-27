import { useEffect, useState } from "react"
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



export const CantAlojamiento = ({ email }) => {
    const [alojamientoUsuario, setAlojamientoUsuario] = useState([])

    useEffect(() => {
        const alojamientos = async () => {
            try {
                const { data } = await axios.get(`/user/${email}`)
                const housings = data.Housings

                console.log(housings, 'housings')

                setAlojamientoUsuario(housings)
            } catch (error) {
                console.error("Algo falló en la petición a mi Backend", error);
            }
        }

        alojamientos();
    }, [email])

    return (
        <div>
            <Carousel responsive={responsive}>
                {alojamientoUsuario?.map((alojamiento, index) => {
                    return (
                        <div className="flex flex-col  h-80 aspect-video border border-black border-solid m-5 cursor-pointer" key={index}>
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

                <button className="h-80 aspect-video border-2 border-black border-dashed bg-opacity-100 font-custom">
                    <IoAddCircleOutline className="w-14 h-14"/>
                    <h4>Añadir Alojamiento</h4>
                </button>
            </Carousel>
        </div>

            
    )
}