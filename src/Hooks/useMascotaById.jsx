import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMascotaById } from "../Redux/boscoSlice";
import axios from "axios";
// import axiosJwt from "../utils/axiosJwt";

export const useMascotaById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const peticionBack = async () => {
      try {
        const responseBack = await axios.get(
          `/getMascotaById/${id}`
        );
        dispatch(getMascotaById(responseBack.data));
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
