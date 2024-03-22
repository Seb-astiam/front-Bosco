import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllAlojamientos } from "../Redux/boscoSlice";
import axios from "axios";


export const useAlojamientoPrincipal = () => {
    const dispatch = useDispatch();

    useEffect(() => {  
        const peticionBack = async () => {
            try {
                const responseBack = await axios.get("https://back-bosco.up.railway.app/profileHousing/allHousingslocation");
                dispatch(getAllAlojamientos(responseBack.data));
            } 
            catch (error) {
              console.error("Algo falló en la petición a mi Backend", error);
            }
          };
        
          peticionBack();
    }, [dispatch])

}
