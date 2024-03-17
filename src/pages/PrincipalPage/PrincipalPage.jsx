import { Cards } from "../../Components/Cards/Cards"
import { Filtros } from "./Filtro"
import { Nav } from "./Nav"


import CardsData from "../../../CardsPrueba.json"

const PrincipalPage = () => {
    return (
        <div className="flex flex-col">
            <div className="bg-black h-[100px]"> 
                <Nav />
            </div>

            <div className="flex items-start w-full h-[100vh] ">
                <Filtros />
                <Cards data={CardsData}/>
            </div>
        </div>
    )
}

export default PrincipalPage