import { useSelector } from "react-redux";
import { CardPrincipal } from "./CardPrincipal";
import { useEffect, useState } from "react";

export const CardsPrincipal = () => {
    const Alojamientos = useSelector((state) => state.storage.allAlojamientos);



    const [numberPage, setNumberPage] = useState(1);

    useEffect( ()=> {
       setNumberPage(1)
   }, [Alojamientos.length])

    const NumAlojamientosPage = 10;
    const lastIndex = numberPage * NumAlojamientosPage;
    const firstIndex = lastIndex - NumAlojamientosPage;
    const newArrAlojamientos = Alojamientos.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(Alojamientos.length / NumAlojamientosPage);

    const nextPage = () => {
       setNumberPage(numberPage + 1);
    }

    const prevPage = () => {
       setNumberPage(numberPage - 1);
    }

    const goToPage = (page) => {
        setNumberPage(page);
    };

    return (
        <div className="flex flex-col gap-1 px-[10px] mt-[10px] rounded-lg border-justify-evenly w-full h-screen  bg-opacity-80 m-1">

            <div className="flex h-[5%] w-full justify-center items-center m-2">
                <button onClick={prevPage} disabled={numberPage === 1} className=" bg-transparent ">❮</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        className={` rounded-[50%] py-1 px-2 ${numberPage === index + 1 ? "bg-[#8b8e58]" : "bg-whiteseñales"}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} disabled={numberPage === totalPages} className=" bg-transparent ">❯</button>
            </div>

            <div className="flex flex-wrap h-[95%] w-full gap-1 justify-center items-start">
                {newArrAlojamientos.map((alojamiento) => {
                    return <CardPrincipal alojamiento={alojamiento} key={alojamiento.id}/>
                })}
            </div>
        </div>
    )
}
