import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCities } from "../Redux/Slice";

const useCities = (provinceId) => {
    const dispatch = useDispatch();
    const cities = useSelector((state) => state.maps.cities);

    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/location/cities?provincia=${provinceId}`);
                const formattedCities = response.data.map((city) => ({
                    id: city.id,
                    name: city.nombre,
                }));
                dispatch(setCities(formattedCities));
            } catch (error) {
                console.error("Error al obtener ciudades de la provincia:", error);
            }
        };

        if (provinceId) {
            getCities();
        }
    }, [dispatch, provinceId]);

    return cities;
};

export default useCities;

