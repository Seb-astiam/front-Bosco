import { Cards } from "../../Components/Cards/Cards"
import CardsData from "../../../CardsPrueba.json"

const PrincipalPage = () => {
    return (
        <div>
            <Cards data={CardsData}/>

        </div>
    )
}

export default PrincipalPage