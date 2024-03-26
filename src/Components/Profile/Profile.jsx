import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { FormProfile } from "./FormProfile/FormProfile";
import { MyPets } from "./MyPets/MyPets";
import { MyHousing } from "./MyHousing/MyHousing";

export const Profile = () => {
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
                        <FormProfile/>
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
