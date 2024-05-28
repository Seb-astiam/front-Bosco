import { useEffect, useState } from "react"
import axios from "axios";

import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ModalAlojamiento } from "./modalAlojamientos";
import { HousingCard } from "./HousingCard";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

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

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
            <div className="w-full h-full ">
                <h2 className="font-custom font-extralight text-black">Alojamientos</h2>
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    // autoPlay={true}
                    // autoPlaySpeed={1000}
                >
                {alojamientoUsuario?.map((alojamiento, index) => {
                    return (
                        <HousingCard alojamiento={alojamiento} key={index} openModal={openModal}/>
                    )
                })}

                <div className={`aspect-video h-[235px] `}>
                    <Link 
                        className="h-[235px] aspect-video border-2 border-black 
                        border-dashed bg-opacity-100 font-custom ml-5 flex 
                        items-center flex-col justify-center no-underline text-black
                        shadow-custom-shadow"
                        to="/ProfileHousing"
                    >
                        <IoAddCircleOutline className="w-14 h-14"/>
                        <h4>Añadir Alojamiento</h4>
                    </Link>
                </div>
                </Carousel>
                
                <ModalAlojamiento  closeModal={closeModal} modalIsOpen={modalIsOpen}/>
            </div>
    )
}