import { useEffect } from "react";
import { useDispatch } from "react-redux"
import axios from "axios";


const useAlojamientoPrincipal = () => {
    const dispatch = useDispatch();

    useEffect(() => {  
        const peticionBack = async () => {
            try {
                const responseBack = await axios.get("http://localhost:3001/pokemons");
                dispatch(getAllPokemons(responseBack.data));
            } 
            catch (error) {
              console.error("Algo falló en la petición a mi Backend", error);
            }
          };
        
          peticionBack();
    }, [dispatch])

    return pokemons
}

export default useAlojamientoPrincipal;