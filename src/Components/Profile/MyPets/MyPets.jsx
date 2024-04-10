import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

export const MyPets = () => {
    const userId = JSON.parse(localStorage.getItem("user")).id
    const [pets, setPets] = useState([])
    const [selectedPet, setSelectedPet] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/allMascotas/${userId}`).then(({ data }) => {
            console.log(data);
            setPets(data)
        })
    }, [])
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSelectedPet(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleShowForm = (pet) => {
        setSelectedPet(pet);
        setShowForm(true);
    }

   
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:3001/mascota/${selectedPet.id}`, selectedPet);
            alert("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Failed to update user data. Please try again.");
        }
    };
    return (
        <div className="flex flex-row-reverse gap-[15px]">
            <div >

                {showForm && selectedPet && (
                    <div>
                        <form className="flex flex-col gap-[15px]">
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={selectedPet.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Type:</label>
                                <input
                                    type="text"
                                    value={selectedPet.type}
                                    name="type"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Age:</label>
                                <input
                                    type="number"
                                    value={selectedPet.age}
                                    name="age"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Aggressiveness:</label>
                                <input
                                    type="checkbox"
                                    checked={selectedPet.aggressiveness}
                                    name="aggressiveness"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Genre:</label>
                                <select
                                    value={selectedPet.genre}
                                    name="genre"
                                    onChange={handleChange}
                                >
                                    <option value="he">Macho</option>
                                    <option value="she">Hembra</option>
                                </select>
                            </div>

                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Raze:</label>
                                <input
                                    type="text"
                                    value={selectedPet.raze}
                                    name="raze"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Size:</label>
                                <input
                                    type="text"
                                    value={selectedPet.size}
                                    name="size"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="border rounded-md p-2 m-2 bg-slate-200">
                                <label>Coexistence:</label>
                                <input
                                    type="checkbox"
                                    checked={selectedPet.coexistence}
                                    name="coexistence"
                                    onChange={handleChange}
                                />
                            </div>
                            <button onClick={handleUpdate}>Actualizar datos</button>
                        </form>
                    </div>
                )}

            </div>
            <div>

                {
                    pets.map((mascota) => {
                        return (
                            <div className="bg-slate-100 cursor-pointer" key={mascota.id} onClick={() => handleShowForm(mascota)}>
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
