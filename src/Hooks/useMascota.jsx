import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMascotas } from "../Redux/boscoSlice";
import axios from "axios";
// import axiosJwt from "../utils/axiosJwt";
import Swal from "sweetalert2";

export const useMascotas = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const peticionBack = async () => {
      try {
        const responseBack = await axios.get(
          `/allMascotas/${id}`
        );
        dispatch(getMascotas(responseBack.data));
      } catch (error) {
        console.log(error)
      }
    };

    peticionBack();
  }, [dispatch]);
};
