import { useState } from "react";
import bosco from "../../assets/bosco-logo.jpeg";
import Swal from "sweetalert2";
import axiosJwt from "../../utils/axiosJwt";
import { useNavigate } from "react-router-dom";

export const FormMascota = () => {
  const navigate = useNavigate();
  const email_usuario = JSON.parse(localStorage.getItem("user"));

  const [input, setInput] = useState({
    images: [],
    name: "",
    type: "",
    age: 1,
    raze: "",
    aggressiveness: false,
    genre: "",
    coexistence: false,
    size: "",
  });

  const [errors, setErrors] = useState({
    images: "",
    name: "",
    type: "",
    age: "",
    raze: "",
    aggressiveness: "",
    genre: "",
    coexistence: "",
    size: "",
  });

  const validate = (input) => {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        name: input.name === "" ? "No has registrado un nombre!" : "",
        type: input.type === "" ? "Selecciona un tipo" : "",
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

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    let newValues;
    if (name === "images") {
      newValues = [
        ...input.images,
        //modificar 1 por la cantidad de imagenes que se cargaran
        ...Array.from(files).slice(0, 1 - input.images.length),
      ];
    } else {
      newValues = value;
    }

    setInput({
      ...input,
      [name]: newValues,
    });

    const valid = validate({
      ...input,
      [name]: newValues,
    });
    setDisableSubmit(!valid);
  };

  const [disabledSubmit, setDisableSubmit] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (key === "images") {
        // Si el campo es "images", agregamos cada archivo al FormData

        value.forEach((image) => formDataToSend.append("images", image));
      } else {
        // Para otros campos del formulario, simplemente los agregamos al FormData
        formDataToSend.append(key, value);
      }
    });

    formDataToSend.append("UserId", email_usuario.id);

    const sendBack = await axiosJwt.post("/newMascota", formDataToSend);

    if (sendBack.status === 201) {
      Swal.fire({
        title: "Excelente",
        text: sendBack.data,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ir a Inicio?",
        showCancelButton: true,
        cancelButtonText: "Quedarme aqui",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Principal");
        }
      });
      setInput({
        images: [],
        name: "",
        type: "",
        age: "",
        raze: "",
        aggressiveness: "",
        genre: "",
        coexistence: "",
        size: "",
      });
    } else {
      console.error("Error al enviar datos al servidor", sendBack.data);
    }
  };

  const reset = () => {
    setInput({
      images: [],
      name: "",
      type: "",
      age: "",
      raze: "",
      aggressiveness: "",
      genre: "",
      coexistence: "",
      size: "",
    });
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...input.images];
    updatedImages.splice(index, 1);
    setInput((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  return (
    <div className="w-screen h-[800px] my-[10px] flex justify-center items-center">
      <div className={`h-[90%] w-[80%] flex justify-center`}>
        <div className="h-[100%] w-[50%] rounded-bl-[20px] rounded-tl-[20px] max-w-[400px]">
          <img
            src={bosco}
            alt="bosco"
            className="rounded-bl-[20px] rounded-tl-[20px] w-full h-full object-cover"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center px-[5%] justify-center rounded-br-[20px] rounded-tr-[20px] h-[100%] w-[50%] !bg-[#FEB156] max-w-[400px]"
        >
          <h1 className="font-custom font-extrabold text-[20px] mb-[20px]">
            Contanos sobre tu mascota!
          </h1>

          <div className="">
            <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
              <box-icon name="dog" type="solid"></box-icon>
              <input
                className="w-[225px] outline-none"
                placeholder="nombre"
                onChange={handleChange}
                name="name"
                value={input.name}
              ></input>
            </label>
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.name}
          </p>

          <div className="">
            <label className="rounded-[20px] bg-gray-50 py-[5px] px-[10px] flex items-center">
              <box-icon type="solid" name="cat"></box-icon>
              <select
                className="w-[225px] outline-none"
                name="type"
                value={input.type}
                onChange={handleChange}
              >
                <option value="" disabled select>
                  Qué mascota tienes?
                </option>
                <option value="Dog">Perro</option>
                <option value="Cat">Gato</option>
                <option value="Reptil">Reptil</option>
                <option value="Caballo">Caballo</option>
              </select>
            </label>
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.type}
          </p>

          <div className="flex flex-row justify-between gap-2">
            <div className="flex flex-col">
              <div className="">
                <label className="flex items-center px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500">
                  edad
                  <input
                    className="ml-[5px] w-[40px] outline-none"
                    onChange={handleChange}
                    name="age"
                    type="number"
                    min="1"
                    max="15"
                    value={input.age}
                  ></input>
                </label>
              </div>
              <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
                {errors.age}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="">
                <label className="flex items-center px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500">
                  raza:
                  <input
                    className="ml-[5px] w-[80px] outline-none"
                    onChange={handleChange}
                    name="raze"
                    value={input.raze}
                  ></input>
                </label>
              </div>
              <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
                {errors.raze}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-2">
            <label className="flex items-center px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500">
              Tu mascota es agresiva?
            </label>

            <label
              htmlFor="agresividadSI"
              className="flex items-center justify-center w-[20px] px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500"
            >
              si
              <input
                className="w-[50px] outline-none"
                onChange={handleChange}
                id="agresividadSI"
                name="aggressiveness"
                type="radio"
                value={true}
              ></input>
            </label>

            <label
              htmlFor="agresividadNO"
              className="flex items-center justify-center w-[20px] px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500"
            >
              no
              <input
                className="w-[50px] outline-none"
                onChange={handleChange}
                id="agresividadNO"
                name="aggressiveness"
                type="radio"
                value={false}
              ></input>
            </label>
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.aggressiveness}
          </p>

          <div className="flex flex-row justify-between gap-2">
            <label className="flex items-center px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500">
              Convive con otras mascotas?
            </label>

            <label
              htmlFor="convivenciaSI"
              className="flex items-center justify-center w-[20px] px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500"
            >
              si
              <input
                className="w-[50px] outline-none"
                onChange={handleChange}
                id="convivenciaSI"
                name="coexistence"
                type="radio"
                value={true}
              ></input>
            </label>
            <label
              htmlFor="convivenciaNO"
              className="flex items-center justify-center w-[20px] px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500"
            >
              no
              <input
                className="w-[50px] outline-none"
                onChange={handleChange}
                id="convivenciaNO"
                name="coexistence"
                type="radio"
                value={false}
              ></input>
            </label>
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.coexistence}
          </p>

          <div className="">
            <label className="rounded-[20px] bg-gray-50 py-[5px] px-[10px] flex items-center">
              <box-icon name="ruler"></box-icon>

              <select
                className="w-[225px] outline-none"
                name="size"
                value={input.size}
                onChange={handleChange}
              >
                <option value="" disabled select>
                  Tamaño de tu mascota
                </option>
                <option value="Grande">Grande</option>
                <option value="Mediano">Mediano</option>
                <option value="Pequeño">Pequeño</option>
              </select>
            </label>
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.size}
          </p>

          <div className="">
            <label className="rounded-[20px] bg-gray-50 py-[5px] px-[10px] flex items-center">
              {input.genre === "he" ? (
                <box-icon name="male-sign"></box-icon>
              ) : (
                <box-icon name="female-sign"></box-icon>
              )}
              <select
                className="w-[225px] outline-none"
                name="genre"
                value={input.genre}
                onChange={handleChange}
              >
                <option value="" disabled select>
                  Selecciona el género
                </option>
                <option value="she">Ella</option>
                <option value="he">Él</option>
              </select>
            </label>
          </div>

          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.genre}
          </p>

          <div>
            <input
              type="file"
              accept="image/*"
              name="images"
              id="images"
              onChange={handleChange}
              className="hidden"
              multiple
            />
            <label
              htmlFor="images"
              className="flex justify-center relative px-4 bg-slate-200 rounded-lg cursor-pointer border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
            >
              <span className="m-2">Subir foto</span>
            </label>
          </div>
          {input.images.map((image, index) => (
            <div key={index} className="flex items-center mr-2">
              <div className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Imagen ${index + 1}`}
                  className="h-16 w-16 object-cover mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white font-bold py-1 px-2 rounded-full"
                >
                  X
                </button>
              </div>
            </div>
          ))}

          <a
            onClick={reset}
            className="font-custom font-semibold flex justify-end cursor-pointer text-[12px] hover:underline"
          >
            Limpiar formulario
          </a>
          <button
            type="submit"
            className={`font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 ${
              disabledSubmit
                ? "bg-[transparent] text-black shadow-md"
                : "bg-[black] text-white shadow-md"
            }`}
            disabled={disabledSubmit}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};
