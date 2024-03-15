import { useState } from "react"
import axios from "axios";

export const FormMascota = () => {
    
    const [input, setInput] = useState({
        image: "",
        name: "",
        type: "",
        age: 1,
        raze: "",
        aggressiveness: false,
        genre: "",
        coexistence: false,
        size: ""
    })

    const [errors, setErrors] = useState({
        image: "",
        name: "",
        type: "",
        age: "",
        raze: "",
        aggressiveness: "",
        genre: "",
        coexistence: "",
        size: ""
    })

    const validate = (input) => {

        // Name 
        setErrors(prevError => ({ ...prevError, name: input.name === "" ? "No has registrado un nombre!" : "" }));

        // type 
        setErrors(prevError => ({ ...prevError, type: input.type === "" ? "Selecciona un tipo" : "" }));

        //age
        setErrors(prevError => ({ ...prevError, age: input.age === "" ? "debe colocar la edad" : "" }));

        //raze
        setErrors(prevError => ({ ...prevError, raze: input.raze === "" ? "Debe indicar la raza" : "" }));

        // genre
        setErrors(prevError => ({ ...prevError, genre: input.genre === "" ? "Selecciona el genero de tu mascota" : "" }));
        
        // size
        setErrors(prevError => ({ ...prevError, size: input.size === "" ? "Dinos que tamaño aproximado tiene tu mascota" : "" }));

    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value
        });
        
        validate({
            ...input,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const sendBack = await axios.post("http://localhost:3001/newMascota", input);

        if (sendBack.status === 201) {
            console.log('Datos enviados con éxito', input);
            setInput({
                image: "",
                name: "",
                type: "",
                age: "",
                raze: "",
                aggressiveness: "",
                genre: "",
                coexistence: "",
                size: ""
            });
        } else {
        console.error('Error al enviar datos al servidor', sendBack.data);
        }
    }



    return (
         <div className="flex justify-center h-[550px]  w-9/12 bg-">
        <form onSubmit={handleSubmit} className="flex flex-col bg-red-400 justify-evenly items-center h-[700px] w-[700px] rounded-[20px] p-[15px] font-mono">

            <h1 className="text-4xl">Formulario Mascota</h1>
            
            <div className="flex gap-2">
                <label className="rounded-[20px] bg-gray-50 p-[10px] ">Image:</label>
                <input name="image" placeholder="Image" value={input.image} onChange={handleChange}></input>
                {errors.image && <span className="bg-gray-50">{errors.image}</span>}
            </div>   

            {/* <div>
                <label htmlFor="formFile">Image:</label>
                <input name="image" type="file" id="formFile" accept="image/*" onChange={handleChange}></input>
                {errors.image && <span>{errors.image}</span>}
            </div> */}

            <div className="flex gap-2">
                <label className="rounded-[20px] bg-gray-50 p-[10px] ">Name:</label>
                <input placeholder="Name" onChange={handleChange} name="name" value={input.name}></input>
                {errors.name && <span className="bg-gray-50 text-red-600">{errors.name}</span>}
            </div>

            <div className="flex gap-2">
                <label className="rounded-[20px] bg-gray-50 p-[10px] ">Tipo de Mascota:</label>
                <select name="type" value={input.type} onChange={handleChange}>
                    <option value="">Que mascota tienes?</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Reptil">Reptil</option>
                    <option value="Caballo">Caballo</option>
                </select>
                {errors.type && <span>{errors.type}</span>}
            </div>

            <div className="flex gap-2">
                <label className="rounded-[20px] bg-gray-50 p-[10px] ">age:</label>
                <input onChange={handleChange} name="age" type="number" min="1" max="15" value={input.age}></input>
                {errors.age && <span>{errors.age}</span>}
            </div>

            <div className="flex gap-2">
                <label className="rounded-[20px] bg-gray-50 p-[10px] ">Raze:</label>
                <input placeholder="Raze" onChange={handleChange} name="raze" value={input.raze}></input>
                {errors.raze && <span>{errors.raze}</span>}
            </div>

            <div className="flex gap-2">
                <label className="rounded-[20px] bg-gray-50 p-[10px] ">Tu mascota es agresiva?</label>
                <input onChange={handleChange} id="agresividadSI" name="aggressiveness" type="radio" value={true}></input>
                <label htmlFor="agresividadSI" className="rounded-[20px] bg-gray-50 p-[10px] ">SI</label>

                <input onChange={handleChange} id="agresividadNO" name="aggressiveness" type="radio" value={false}></input>
                <label htmlFor="agresividadNO" className="rounded-[20px] bg-gray-50 p-[10px] ">NO</label>
                {errors.aggressiveness && <span>{errors.aggressiveness}</span>}
            </div>

            <div className="flex gap-2">
                <label className="rounded-[20px] bg-gray-50 p-[10px] ">Comparte con otras mascotas:</label>

                <input onChange={handleChange} id="convivenciaSI" name="coexistence" type="radio" value={true}></input>
                <label htmlFor="convivenciaSI" className="rounded-[20px] bg-gray-50 p-[10px] ">SI</label>

                <input onChange={handleChange} id="convivenciaNO" name="coexistence" type="radio" value={false}></input>
                <label htmlFor="convivenciaNO" className="rounded-[20px] bg-gray-50 p-[10px] ">NO</label>
                {errors.coexistence && <span>{errors.coexistence}</span>}
            </div>

            <div className="flex gap-2">
                <label className="rounded-[20px] bg-gray-50 p-[10px] ">size:</label>
                <select name="size" value={input.size} onChange={handleChange}>
                    <option value="">Seleccione el tamaño de su mascota</option>
                    <option value="Grande">Grande</option>
                    <option value="Mediano">Mediano</option>
                    <option value="Pequeño">Pequeño</option>
                </select>
                {errors.coexistence && <span>{errors.coexistence}</span>}
            </div>

            <div className="flex gap-2">
                <label className="rounded-[20px] bg-gray-50 p-[10px] ">Genre:</label>
                <select name="genre" value={input.genre} onChange={handleChange}>
                    <option value="">Seleccione el género</option>
                    <option value="she">She</option>
                    <option value="he">He</option>
                </select>
                {errors.genre && <span>{errors.genre}</span>}
            </div>

            <button type="reset" className="rounded-[20px] bg-gray-50 p-[10px] cursor-pointer ">Reset</button>
            <button type="submit" className=" border rounded-[20px] border-white bg-green-700 p-[15px] text-white cursor-pointer hover:bg-green-900">Submit</button>


        </form>
    </div>
    )
}