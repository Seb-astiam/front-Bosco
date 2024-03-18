import { useSelector } from "react-redux";
import { CardPrincipal } from "./CardPrincipal";

export const CardsPrincipal = () => {
    const Alojamientos = useSelector((state) => state.storage.allAlojamientos);

    return (
        <div className="flex flex-wrap gap-1 justify-evenly w-full h-[100vh] bg-lime-100">
            {Alojamientos.map((alojamiento) => {
                return <CardPrincipal alojamiento={alojamiento} key={alojamiento.id}/>
            })}
        </div>
    )
}
