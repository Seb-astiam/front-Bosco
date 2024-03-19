import { useSelector } from 'react-redux';
import { useLocationProvincias } from '../../Hooks/useLocationProvincias'
import { getAllAlojamientos } from '../../Redux/boscoSlice'
import { useDispatch } from "react-redux";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useServices } from '../../Hooks/useServices';

export const Filtros = () => {
    useLocationProvincias();
    useServices();
    const dispatch = useDispatch();

    const initialState = {
        location: "",
        serviceId: "",
        square: 1,
        maxPrice: "",
        startDate: "",
        endDate: "",
        orderBy: "",
        orderDirection: "",
    }


    const [filter, setFilter] = useState(initialState)

    const URL = 'http://localhost:3001/profileHousing/filtered'
    
    const provincias = useSelector((state) => state.storage.AllLocation);
    const services = useSelector((state) => state.storage.AllService);
    const Alojamiento = useSelector((state) => state.storage.allAlojamientos)

    const handleChange = async (e) => {
        const changeFilter = {...filter, [e.target.name]: e.target.value}
        setFilter(changeFilter)
        let query = "?";

        for (const [key, value] of Object.entries(changeFilter)) {
            if (value) query += `${key}=${value}&`;
        }

          try {
            const { data } = await axios.get(URL + query);
            dispatch(getAllAlojamientos(data));
          } catch (error) {
            console.log(error);
          }
    }


    const [show, setShow] = useState(true)

    const resetFilter = async () => {
        setFilter(initialState)

        if(show) setShow(false)

        try {
            const { data } = await axios.get(URL);
            dispatch(getAllAlojamientos(data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setShow(true)
    }, [Alojamiento])

    

    return (
        <div className="w-[400px] bg-naranjaForm h-[100vh] ">

            {show && <div>
                <select onChange={handleChange} name="location">
                    <option value="">Ubicación</option>
                    {provincias.map((provincia) => {
                        return <option value={provincia.nombre} key={provincia.id}>{provincia.nombre}</option>
                    })}

                </select>

                <select onChange={handleChange} name="serviceId">
                    <option value="">Services</option>
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
                        defaultValue={1}
                    />
                </div> 

                <div>
                    <label htmlFor="maxPrice" >Precio</label>
                    <input value={filter.maxPrice} name='maxPrice' id='maxPrice' type='range'
                            min="5"
                            max="100"
                            step="5"
                            onChange={handleChange} 
                    ></input>
                    {<span>${filter.maxPrice}</span>}
                </div>

                <div>
                    <label>Orden</label>
                    <select name='orderBy' onChange={handleChange}>
                        <option value="">Escoge un tipo orden</option> 
                        <option value="price">Precio</option>
                        <option value="square">Plazas</option>
                    </select>
                </div>

                <div>
                    <label>Dirección Orden</label>
                    <select name='orderDirection' onChange={handleChange}>
                        <option value="">Escoge una dirección de orden</option>
                        <option value="DESC">DESCENDENTE</option>
                        <option value="ASC">ASCEDENTE</option>
                    </select>
                </div>

            </div>}

                <button onClick={resetFilter}>Resetear Filtros</button>
        </div>
    )
}
