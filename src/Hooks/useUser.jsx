import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "../Redux/boscoSlice";
// import axios from "axios";
import Swal from "sweetalert2";
import axiosJwt from "../utils/axiosJwt";

export const useUser = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const peticionBack = async () => {
      try {
        const responseBack = await axiosJwt.get(
          `http://localhost:3001/user/UserById/${id}`
        );
        dispatch(getUserById(responseBack.data));
      } catch (error) {
        return console.error(error);
      }
    };

    peticionBack();
  }, [id]);
};
