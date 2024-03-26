import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FormProfile } from "./FormProfile/FormProfile";

export const Profile = () => {
    return (
        <div
        className="flex  gap-2"
        >
            <div
            className=" p-[5px] m-[5px] gap-2 h-[350px]  shadow-md bg-slate-100"
            >

            <Link to={"perfil"}>
                <p>
                    Perfil
                </p>
            </Link>

            <Link to={"alojamientos"}>
                <p>
                    Alojamienos
                </p>
            </Link>

            </div>

            <div className="p-5">

                <Routes>
                    <Route path='perfil' element={
                        <FormProfile/>
                    } />
                    <Route path='alojamientos' element={
                        <div>
                            hola alojamiento
                        </div> 
                    } />
                </Routes>
            </div>
        </div>
    );
};
