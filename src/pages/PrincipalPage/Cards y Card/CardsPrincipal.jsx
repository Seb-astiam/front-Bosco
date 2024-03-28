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



    return (
        <div className="flex flex-col gap-1 justify-evenly w-full h-screen bg-white">

            <div className="flex h-[5%] w-full justify-center items-center">
                <button onClick={prevPage} disabled={numberPage === 1} className="btn-cards">PREV</button>
                <button onClick={nextPage} disabled={numberPage === totalPages} className="btn-cards">NEXT</button>
            </div>

            <div className="flex flex-wrap h-[95%] w-full gap-5 justify-center items-center">
                {newArrAlojamientos.map((alojamiento) => {
                    return <CardPrincipal alojamiento={alojamiento} key={alojamiento.id}/>
                })}
            </div>
        </div>
    )
}
