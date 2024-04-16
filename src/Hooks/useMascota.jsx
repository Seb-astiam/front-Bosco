import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMascotas } from "../Redux/boscoSlice";
// import axios from "axios";
import axiosJwt from "../utils/axiosJwt";

export const useMascotas = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const peticionBack = async () => {
      try {
        const responseBack = await axiosJwt.get(
          `http://localhost:3001/allMascotas/${id}`
        );
        dispatch(getMascotas(responseBack.data));
      } catch (error) {
        return Swal.fire({
          title: "Error!",
          text: error.response.data,
          icon: "error",
        });
      }
    };

    peticionBack();
  }, [dispatch]);
};
