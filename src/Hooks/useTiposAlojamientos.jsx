import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getTiposAlojamientos } from "../Redux/boscoSlice";
import axios from "axios";


export const useTiposAlojamientos = () => {
    const dispatch = useDispatch();

    useEffect(() => {  
        const peticionBack = async () => {
            try {
                const { data } = await axios.get("http://localhost:3001/housingtype/alltypes");
                dispatch(getTiposAlojamientos(data));
            } 
            catch (error) {
              console.error("Algo falló en la petición a mi Backend", error);
            }
          };
        
          peticionBack();
    }, [dispatch])

}