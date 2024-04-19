import React, { useEffect, useState } from "react";
import axios from 'axios'

export const MyPets = () => {
    const email = JSON.parse(localStorage.getItem("user")).email
    const [pets, setPets] = useState([])
    const [selectedPet, setSelectedPet] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showImage, setShowImage] = useState([]);

    useEffect(() => {
        axios.get(`/allMascotas/${email}`).then(({ data }) => {
            setPets(data)
        })
    }, [])
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        let newValue;
        if (name === "images") {
            newValue = [
                ...showImage,
                ...Array.from(files).slice(0, 1 - showImage.length),
            ];
        } else {
            newValue = value;
        }
        setSelectedPet(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : newValue
        }));
    };

    const handleShowForm = (pet) => {
        setSelectedPet(pet);
        setShowForm(true);
    }


    const handleUpdate = async (event) => {
        event.preventDefault();
        // Uso de la función

        try {
            const formDataToSend = new FormData();
            Object.entries(selectedPet).forEach(([key, value]) => {

                if (key === "images") {
                    console.log(value);
                    // Si el campo es "images", agregamos cada archivo al FormData
                    if (value) {
                        value.forEach((image) => formDataToSend.append("images", image));
                    }
                } else {
                    // Para otros campos del formulario, simplemente los agregamos al FormData
                    formDataToSend.append(key, value);
                }
            });

            await axios.put(`/mascota/${selectedPet.id}`, formDataToSend);
            alert("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Failed to update user data. Please try again.");
        }
    };
    function urlToFile(url, filename, mimeType) {
        return fetch(url)
            .then(response => response.blob())
            .then(blob => new File([blob], filename, { type: mimeType }));
    }


    return (
        <div className="flex flex-row-reverse gap-[15px]">
            <div >

                {showForm && selectedPet && (
                    <div>
                        <form className="flex flex-col gap-[15px]">
                            <div>
                                {
                                    (!selectedPet.images) ?
                                        <img className="w-[150px]" src={selectedPet.image} alt="" />
                                        :
                                        <img className="w-[150px]" src={URL.createObjectURL(selectedPet.images[0])} alt="" />
                                }
                            </div>
                            <div >
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="images"
                                    id="images"
                                    onChange={handleChange}
                                    className="hidden"
                                    multiple
                                />
                                <label
                                    htmlFor="images"
                                    className="flex justify-center relative px-4 bg-slate-200 rounded-lg cursor-pointer border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                                >
                                    <span className="m-2">Cambiar foto de mascota</span>

                                </label>
                            </div>
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
