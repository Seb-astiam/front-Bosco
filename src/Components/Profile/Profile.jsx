import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FormProfile } from "./FormProfile/FormProfile";
import { MyPets } from "./MyPets/MyPets";
import { MyHousing } from "./MyHousing/MyHousing";
import axios from "axios";

export const Profile = () => {
    const userId= JSON.parse(localStorage.getItem("user")).id
    const [formData, setFormData] = useState({
        userId,
        images:[],
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
                const response = await axios.get(`/profile/${userId}`);
                const userData = response.data;
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
            await axios.put("/profile/", formData);
            alert("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Failed to update user data. Please try again.");
        }
    };
    const handlePost = async () => {
        try {
            await axios.post("/profile/", formData);
            alert("User data updated successfully!");
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Failed to update user data. Please try again.");
        }
    };
    return (
        <div
        className="flex  gap-2"
        >
            <div
            className=" p-[5px] m-[5px] gap-2 h-[450px] w-[200px]  shadow-md bg-slate-100"
            >

            <Link to={"perfil"} className="flex-1 relative leading-[20px] no-underline">
                <p className="font-bold shadow-md m-[5px] hover:bg-slate-300">
                    Perfil
                </p>
            </Link>

            <Link to={"alojamientos"} className="flex-1 relative leading-[20px] no-underline">
            <p className="font-bold shadow-md m-[5px] hover:bg-slate-300">

                    Alojamienos
                </p>
            </Link>
            <Link to={"mascotas"} className="flex-1 relative leading-[20px] no-underline">
            <p className="font-bold shadow-md m-[5px] hover:bg-slate-300">
                    Mis mascotas
                </p>
            </Link>

            </div>

            <div className="p-5">

                <Routes>
                    <Route path='perfil' element={
                        <FormProfile nuevo={nuevo} handlePost={handlePost} handleUpdate={handleUpdate} handleChange={handleChange} formData={formData}/>
                    } />
                    <Route path='alojamientos' element={
                        <div>
                            <MyHousing/>
                        </div> 
                    } />
                    <Route path='mascotas' element={
                        <div>
                            <MyPets/>
                        </div> 
                    } />
                </Routes>
            </div>
        </div>
    );
};
