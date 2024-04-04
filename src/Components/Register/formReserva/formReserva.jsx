import { useState } from "react"
import { useLocation } from "react-router-dom";
import axios from 'axios'
import Swal from "sweetalert2";
import 'boxicons'

export const FormReserva = () => {

    const { state } = useLocation();
    
    const email_usuario = JSON.parse(localStorage.getItem("user"));

    console.log(email_usuario)

    const [input, setInput] = useState({
        fechaInicio: '',
        fechaFin: ''
    })

    const handleChange = (e) => {
        const { value, name } = e.target

        setInput(prevInput => ({
            ...prevInput, [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!input?.fechaInicio || !input?.fechaFin) {

            return Swal.fire({
                title: "ERROR",
                text: "Te faltan llenar campos",
                icon: "error"
              });
        }

        

        const body = {
            fechaInicio: input.fechaInicio,
            fechaFin: input.fechaFin, 
            email_usuario: email_usuario.email,         
            id_alojamiento: state?.id

        }

        try {
            const { data } = await axios.post('http://localhost:3001/reservation/newReservation', body);
            Swal.fire({
                icon: "success",
                title: data,
                text: "Esperando aceptación",
              });

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <form className='flex flex-col items-center justify-center gap-8'>

           

            <label className='w-64 h-10 text-center flex items-center justify-center gap-5'>
                <box-icon name='calendar-edit' ></box-icon>
                <input type="date" name="fechaInicio" onChange={handleChange}></input>
            </label>

            <label className='w-64 h-10 text-center flex items-center justify-center gap-5'>
                <box-icon name='calendar-edit' ></box-icon>
                <input type="date" name="fechaFin" onChange={handleChange}></input>
            </label>

            <button className="cursor-pointer border-none py-3 pr-[20.799999999999955px] pl-[21px] bg-[#eb662b] flex-1 rounded-181xl flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-[#d14d12]" onClick={handleSubmit}>Enviar reserva</button>
        </form>
    )
}