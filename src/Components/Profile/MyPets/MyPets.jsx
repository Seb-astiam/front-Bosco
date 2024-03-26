import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

export const MyPets = () => {
    const { id } = useParams();
    const [pets, setPets] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/userMascotas/ff8f1f16-0594-4b07-b5fc-c846fe86d8c3').then(({ data }) => {
            console.log(data);
            setPets(data)
        })
    }, [])
    return (
        <div>
            {
                pets.map((mascota)=>{
                    return (
                        <div className="bg-slate-100">
                            <img className="w-[150px]" src={mascota.image} alt="" />
                            <p>
                            {mascota.name}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    );
};
