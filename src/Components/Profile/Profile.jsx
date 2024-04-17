import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FormProfile } from "./FormProfile/FormProfile";
import { MyPets } from "./MyPets/MyPets";
import { MyHousing } from "./MyHousing/MyHousing";
import axios from "axios";

export const Profile = () => {
    const userId = JSON.parse(localStorage.getItem("user")).id
    const userEmail = JSON.parse(localStorage.getItem("user")).email
    const [formHousing, setFormHousing] = useState({
        userId
    });
    const [formData, setFormData] = useState({
        userId,
        images: [],
        name: "",
        surname: "",
        genre: "",
        province: "",
        city: "",
        address: "",
        phone: "",
        balance: 0

    });
    const [formDataErrors, setFormDataErrors] = useState({
        images: "",
        name: "",
        surname: "",
        genre: "",
        province: "",
        city: "",
        address: "",
        phone: "",
        balance: 0

    });

    const [nuevo, setrNuevo] = useState(true)

    const handleChangeHousing = (e) => {
        const { name, value } = e.target;
        setFormHousing({
            ...formHousing,
            [name]: value,
        });
    };


    const validate = (input) => {
        setErrors((prevErrors) => {
            return {
                ...prevErrors,
                name: input.name === "" ? "No has registrado un nombre!" : "",
                age: input.age === "" ? "debe colocar la edad" : "",
                raze: input.raze === "" ? "Debe indicar la raza" : "",
                genre: input.genre === "" ? "Selecciona el genero de tu mascota" : "",
                size:
                    input.size === ""
                        ? "Dinos que tamaño aproximado tiene tu mascota"
                        : "",
            };
        });
        const valid = Object.values({
            ...errors,
            name: input.name === "" ? "No has registrado un nombre!" : "",
            type: input.type === "" ? "Selecciona un tipo" : "",
            age: input.age === "" ? "debe colocar la edad" : "",
            raze: input.raze === "" ? "Debe indicar la raza" : "",
            genre: input.genre === "" ? "Selecciona el genero de tu mascota" : "",
            size:
                input.size === "" ? "Dinos que tamaño aproximado tiene tu mascota" : "",
        }).every((error) => error === "");
        return valid;
    };
    const [disabledSubmit, setDisableSubmit] = useState(true);
    const handleChange = (e) => {
        const { id, value, name } = e.target;

        setFormData({ ...formData, [id]: value });


        const valid = validate({
            ...formData,
            [name]: value,
        });
        setDisableSubmit(!valid);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/profile/${userEmail}`);
                const housing = await axios.get(`http://localhost:3001/profileHousing/housingsById?id=${userId}`);
                const userData = response.data;
                console.log(response);
                console.log(userData);
                const housingData = housing.data;
                setFormHousing({
                    ...formHousing,
                    id: housingData.id || null,
                    title: housingData.title || "",
                    datesAvailable: housingData.datesAvailable || null,
                    datesEnd: housingData.datesEnd || null,
                    type: housingData.type || "",
                    price: housingData.price || 0,
                    provinces: housingData.provinces || "",
                    cities: housingData.cities || "",
                    square: housingData.square || 0,
                    availability: housingData.availability || false,
                    images: housingData.images || [],
                    accommodationType: housingData.accommodationType || "",
                });
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
                        <FormProfile nuevo={nuevo} handlePost={handlePost} handleUpdate={handleUpdate} handleChange={handleChange} formData={formData} />
                    } />
                    <Route path='alojamientos' element={
                        <div>
                            <MyHousing handleChange={handleChangeHousing} formHousing={formHousing} />
                        </div>
                    } />
                    <Route path='mascotas' element={
                        <div>
                            <MyPets />
                        </div>
                    } />
                </Routes>
            </div>
        </div>
    );
};
