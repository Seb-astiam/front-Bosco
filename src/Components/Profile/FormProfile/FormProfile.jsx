import React, { useState, useEffect } from "react";
import axios from "axios";
import pictureDefault from "../../../assets/perfilPicture.webp"

export const FormProfile = (params) => {
    const { formData, handlePost, handleUpdate, nuevo, handleChange } = params
    let picture = pictureDefault
    if (JSON.parse(localStorage.getItem("user")).picture) {
        picture = JSON.parse(localStorage.getItem("user")).picture
    }
    const email = JSON.parse(localStorage.getItem("user")).email
    const [updatePicture_, setUpdatePicture] = useState(null)

    const [img, setImg] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:3001/user/${email}`).then(({ data }) => {
            // Obtener el objeto del localStorage
            const userLocal = JSON.parse(localStorage.getItem("user"));

            // Actualizar el valor 'picture' en el objeto
            userLocal.picture = data;

            // Guardar el objeto actualizado en localStorage
            localStorage.setItem("user", JSON.stringify(userLocal));


            setImg(data);
        });

    }, [])
    const updatePicture = async (e) => {
        const { files } = e.target;
        const picture = files[0];
        const formDataToSend = createFormDataWithPicture(picture);

        try {
            const response = await axios.put(
                `http://localhost:3001/user/pictureUser?email=${email}`,
                formDataToSend
            );

            if (
                response.status === 201 &&
                response.data.message === "Datos recibidos correctamente"
            ) {
                console.log("actualizado correctamente");
            }


        } catch (error) {
            console.error("Error:", error);
        }

        setImg(URL.createObjectURL(picture));
    };

    const createFormDataWithPicture = (picture) => {
        const formData = new FormData();
        formData.append("picture", picture);
        console.log(picture);
        console.log(formData);
        return formData;
    };

    return (
        <div>

            <div className="flex gap-[15px] items-center space-y-4">
                <div>
                    <div className="h-[160px] w-[160px] m-2">
                        {img ?

                            <img src={img} className="h-full" alt="" />
                            :

                            <img src={picture} className="h-full" alt="" />
                        }

                    </div>
                    <div >
                        <input
                            type="file"
                            accept="image/*"
                            name="images"
                            id="images"
                            onChange={updatePicture}
                            className="hidden"
                            multiple
                        />
                        <label
                            htmlFor="images"
                            className="flex justify-center relative px-4 bg-slate-200 rounded-lg cursor-pointer border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                        >
                            <span className="m-2">Cambiar foto de perfil</span>

                        </label>
                    </div>
                </div>
                <div>

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
