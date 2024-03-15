import { useState } from "react"


export const [errors, setErrors] = useState({
    imagen: "",
    name: "",
    tipo: "",
    edad: "",
    raza: "",
    agresividad: "",
    genre: "",
    convivencia: "",
    tamaño: ""
})

export const validate = (input) => {

    // Name 
    setErrors(prevError => ({ ...prevError, name: input.name === "" ? "No has registrado un nombre" : "" }));

    // Price 
    setErrors(prevError => ({ ...prevError, price: input.price === "" ? "Registra un valor" : "" }));
}