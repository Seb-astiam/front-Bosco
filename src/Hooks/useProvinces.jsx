import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setProvinces, setCities } from "../Redux/Slice";

const useProvinces = () => {
    const provincias = useSelector((state) => state.maps.provinces);
    const dispatch = useDispatch();
    const URL = `http://localhost:3001/location/provinces`;

    useEffect(() => {
        const getProvincies = async () => {
            try {
                const responseBackEnd = await axios.get(URL);
                // Mapear los tipos para asegurarnos de que tengan el formato correcto
                const formattedProvinces = responseBackEnd.data.map((type) => ({
                    id: type.id,
                    name: type.nombre,
                }));

                dispatch(setProvinces(formattedProvinces));
            } catch (error) {
                console.error("Algo falló en la petición a mi BackEnd location/provinces");
            }
        };

        getProvincies();
    }, [dispatch, URL]);

    return provincias;
};
 
export default useProvinces;