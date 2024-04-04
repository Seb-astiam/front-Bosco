import React, { useState, useEffect } from "react";
import axios from "axios";

export const FormProfile = () => {
    const userId= JSON.parse(localStorage.getItem("user")).id
    const [formData, setFormData] = useState({
        userId,
        name: "",
        username:"",
        genre:"",
        province: "",
        city: "",
        address: "",
        phone: "",
        balance:0

    });
    const [nuevo,setrNuevo]=useState(true)

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/profile/${userId}`);
                const userData = response.data;
                console.log(userData);
                setFormData({
                    ...formData,
                    name: userData.name || "",
                    surname: userData.surname || "",
                    genre: userData.genre || "",
                    province: userData.province || "",
                    city: userData.city || "",
                    address: userData.address || "",
                    phone: userData.phone || "",
                    balance: userData.balance || 0
                });
                setrNuevo(false)
            } catch (error) {
                setrNuevo(true)
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);
    const handleUpdate = async () => {
        try {
            await axios.put("http://localhost:3001/profile/", formData);
            alert("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Failed to update user data. Please try again.");
        }
    };
    const handlePost = async () => {
        try {
            await axios.post("http://localhost:3001/profile/", formData);
            alert("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Failed to update user data. Please try again.");
        }
    };
    return (
        <div>
            <div className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="name" className="text-sm">Nombre:</label>
                    <input type="text" id="name" className="border border-gray-300 rounded-md px-3 py-2 w-full" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="surname" className="text-sm">Apellido:</label>
                    <input type="text" id="surname" className="border border-gray-300 rounded-md px-3 py-2 w-full" value={formData.surname} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="genre" className="text-sm">Sexo:</label>
                    <input type="text" id="genre" className="border border-gray-300 rounded-md px-3 py-2 w-full" value={formData.genre} onChange={handleChange} />
                </div>
            </div>
            <div className="flex flex-col border-4 w-[500px] p-5 border-black space-y-4">
                <div>
                    <label htmlFor="province" className="text-sm">Province:</label>
                    <input type="text" id="province" className="border border-gray-300 rounded-md px-3 py-2 w-full" value={formData.province} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="city" className="text-sm">City:</label>
                    <input type="text" id="city" className="border border-gray-300 rounded-md px-3 py-2 w-full" value={formData.city} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="address" className="text-sm">Address:</label>
                    <input type="text" id="address" className="border border-gray-300 rounded-md px-3 py-2 w-full" value={formData.address} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="phone" className="text-sm">Phone:</label>
                    <input type="text" id="phone" className="border border-gray-300 rounded-md px-3 py-2 w-full" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="balance" className="text-sm">Balance:</label>
                    <input type="text" id="balance" className="border border-gray-300 rounded-md px-3 py-2 w-full" value={formData.balance} onChange={handleChange} />
                </div>
            </div>

            {!nuevo ? <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Actualizar
            </button> :
            <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Nuevo
            </button>}
        </div>
    );
};
