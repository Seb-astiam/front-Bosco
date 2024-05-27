import { useEffect, useState } from "react"


export const CantAlojamiento = () => {

    const [AlojamientoUsuario, setAlojamientoUsuario] = useState([])

    useEffect(() => {
        const alojamientos = () => {
            const { data } = axios('')
        }

        alojamientos();
    }, [])

    return (
        <div>

        </div>
    )
}