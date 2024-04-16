import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllAlojamientos } from "../Redux/boscoSlice";
import axios from "axios";
import axiosJwt from "../utils/axiosJwt";

export const useAlojamientoPrincipal = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const peticionBack = async () => {
      try {
        const responseBack = await axiosJwt.get(
          "http://localhost:3001/profileHousing/allHousingslocation"
        );
        dispatch(getAllAlojamientos(responseBack.data));
        console.log(responseBack.data, "dataValue22")
      } catch (error) {
        console.error("Algo falló en la petición a mi Backend", error);
      }
    };

    peticionBack();
  }, [dispatch]);
};
