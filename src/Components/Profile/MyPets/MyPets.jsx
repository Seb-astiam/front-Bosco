import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

export const MyPets = () => {
    const { id } = useParams();
    const [pets, setPets] = useState([])
    const [selectedPet, setSelectedPet] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/allMascotas/7be67569-4f07-47c2-b1e8-a957d7e98198').then(({ data }) => {
            console.log(data);
            setPets(data)
        })
    }, [])

    const handleShowForm = (pet) => {
        setSelectedPet(pet);
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }

    return (
        <div className="flex flex-row-reverse gap-[15px]">
            <div >

                {showForm && selectedPet && (
                    <div>
                        <form className="flex flex-col gap-[15px]">
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Name:</label>
                                <input type="text" value={selectedPet.name} readOnly />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Type:</label>
                                <input type="text" value={selectedPet.type} readOnly />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Age:</label>
                                <input type="number" value={selectedPet.age} readOnly />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Aggressiveness:</label>
                                <input type="text" value={selectedPet.aggressiveness ? 'Yes' : 'No'} readOnly />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Genre:</label>
                                <input type="text" value={selectedPet.genre} readOnly />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Raze:</label>
                                <input type="text" value={selectedPet.raze} readOnly />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Size:</label>
                                <input type="text" value={selectedPet.size} readOnly />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Coexistence:</label>
                                <input type="text" value={selectedPet.coexistence ? 'Yes' : 'No'} readOnly />
                            </div>
                            <button onClick={handleCloseForm}>Close</button>
                        </form>


                    </div>
                )}
            </div>
            <div>

                {
                    pets.map((mascota) => {
                        return (
                            <div className="bg-slate-100" key={mascota.id} onClick={() => handleShowForm(mascota)}>
                                <img className="w-[150px]" src={mascota.image} alt="" />
                                <p>{mascota.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};
