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
    console.log(formHousing[0]);
    return (
        <>
        <></>
            <MyHousing formHousing={formHousing[0]} />
        </>
    )
};
