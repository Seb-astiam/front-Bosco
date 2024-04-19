import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ValidateFormdata } from "../../Register/ProfileHousing/validate";
import { useServices } from "../../../Hooks/useServices";
import { useLocationProvincias } from "../../../Hooks/useLocationProvincias";
import useCities from "../../../Hooks/useCities";
import { useTiposAlojamientos } from "../../../Hooks/useTiposAlojamientos";
import { MyHousing } from "../MyHousing/MyHousing";
export const MyHousings = (param) => {
    const { formHousing } = param
    const [selectedHousing, setSelectedHousing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const handleShowForm = (housing) => {
        setSelectedHousing(housing);
        setShowForm(true);
    }


    return (
        <div className="flex gap-[15px]">
            <div>


                {
                    formHousing.map((housing, index) => {
                        return (
                            <div className="bg-slate-100 cursor-pointer" key={index} onClick={() => handleShowForm(formHousing[index])}>
                                {housing.images.map((image, index) => (
                                    <div key={index} className="flex items-center mr-2">
                                        <div className="relative">
                                            <img
                                                src={image}
                                                alt={`Imagen ${index + 1}`}
                                                className="h-16 w-16 object-cover mr-2"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <p>{housing.title}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div>

                {showForm && selectedHousing && (
                    <MyHousing formHousing={selectedHousing} selectedHousing={selectedHousing} />

                )}
            </div>
        </div>
    )
};
