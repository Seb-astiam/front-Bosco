import { useSelector } from 'react-redux';
import { useLocationProvincias } from '../../Hooks/useLocationProvincias'
import { getAllAlojamientos } from '../../Redux/boscoSlice'
import { useDispatch } from "react-redux";

import axios from 'axios';
import { useState } from 'react';
import { useServices } from '../../Hooks/useServices';

export const Filtros = () => {
    useLocationProvincias();
    useServices();
    const dispatch = useDispatch();


    const [filter, setFilter] = useState({
        location: "",
        serviceId: [],
        square: "",
        maxPrice: "",
        startDate: "",
        endDate: "",
        orderBy: "",
        orderDirection: "",
    })

    const URL = 'http://localhost:3001/profileHousing/filtered'
    
    const provincias = useSelector((state) => state.storage.AllLocation);
    const services = useSelector((state) => state.storage.AllService);

    const handleChange = async (e) => {
        let query = "?";

        for (const [key, value] of Object.entries({
            ...setFilter,
            [e.target.name]: e.target.value,
          })) {
            if (value) query += `${key}=${value}&`;
          }

          try {
            const { data } = await axios.get(URL + query);
            dispatch(getAllAlojamientos(data));
          } catch (error) {
            console.log(error);
          }



    }

    // const responseAlojamientos = async() => {
    //     try {
    //         const response = await axios() 


    //     } catch (error) {
            
    //     }
    // }

    return (
        <div className="w-[400px] bg-orange-600 h-[100vh] ">
            <select onChange={handleChange} name="location">
                <option>Escoge una provincia</option>
                {provincias.map((provincia) => {
                    return <option value={provincia.nombre} key={provincia.id}>{provincia.nombre}</option>
                })}

            </select>

            <select onChange={handleChange} name="serviceId">
                <option>Services</option>
                {services.map((service) => {
                    return <option value={service.id} key={service.id}>{service.type}</option>
                })}
            </select>


            
            <div>
                <label htmlFor="square" >plazas</label>
                <input type="number" 
                    id="square" name="square" min="1" max="20" 
                    onChange={handleChange}
                    value={filter.square}
                />
            </div> 

            {/* <div>
                <input value={filter.square} name='square' id='square' type='range'
                        min="5"
                        max="100"
                        onChange={handleChange} 
                ></input>
            </div>

            <div>
            <label>plazas</label>
                <input value={filter.square} name='square' id='square'
                    onChange={handleChange} 
                ></input>
            </div> */}
        </div>
    )
}
