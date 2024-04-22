import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FormProfile } from "./FormProfile/FormProfile";
import { MyPets } from "./MyPets/MyPets";
import { MyHousing } from "./MyHousing/MyHousing";
import axios from "axios";
import { MyHousings } from "./MyHousings/MyHousings";
import { useServices } from "../../Hooks/useServices";
import { useLocationProvincias } from "../../Hooks/useLocationProvincias";
import useCities from "../../Hooks/useCities";
import { useTiposAlojamientos } from "../../Hooks/useTiposAlojamientos";
export const Profile = () => {
    useServices();
    useLocationProvincias();
    useCities();
    useTiposAlojamientos();
    const userEmail = JSON.parse(localStorage.getItem("user")).email
    const [formHousing, setFormHousing] = useState([]);

    const [formData, setFormData] = useState({
        userEmail,
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


    const validate = (input) => {
        setFormDataErrors((prevErrors) => {
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
            ...formDataErrors,
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
                await axios.get(`/profile/${userEmail}`).then(({ data }) => {
                    const userData = data;
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
                });
                await axios.get(`/profileHousing/allHousingsUser/${userEmail}`).then(({ data }) => {
                    const housingData = data;
                    setFormHousing(housingData);
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

                {/* <Link to={"alojamientos"} className="flex-1 relative leading-[20px] no-underline">
                    <p className="font-bold shadow-md m-[5px] hover:bg-slate-300">

                        Alojamienos
                    </p>
                </Link> */}
                <Link to={"mascotas"} className="flex-1 relative leading-[20px] no-underline">
                    <p className="font-bold shadow-md m-[5px] hover:bg-slate-300">
                        Mis mascotas
                    </p>
                </Link>

            </div>

            <div className="p-5">

                <Routes>
                    <Route path='perfil' element={
                        <FormProfile nuevo={nuevo} handlePost={handlePost} handleUpdate={handleUpdate} handleChange={handleChange} formData={formData} formDataErrors={formDataErrors} />
                    } />
                    {/* <Route path='alojamientos' element={
                        <div>
                            <MyHousings formHousing={formHousing} />
                        </div>
                    } /> */}
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
