import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const PetUpdate = ({ pet, getPets }) => {
  const [petForm, setPetForm] = useState({ ...pet, images: [] });

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

  const [disabledSubmit, setDisableSubmit] = useState(true);

  const [imageSrc, setImageSrc] = useState(pet.image);

  const [showImg, setShowImg] = useState(true);

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
        ...petForm.images,
        //modificar 1 por la cantidad de imagenes que se cargaran
        ...Array.from(files).slice(0, 1 - petForm.images.length),
      ];
      setImageSrc(URL.createObjectURL(newValues[0]));
      setShowImg(false);
      setShowImg(true);
    } else {
      newValues = value;
    }

    setPetForm({
      ...petForm,
      [name]: newValues,
    });

    const valid = validate({
      ...petForm,
      [name]: newValues,
    });
    setDisableSubmit(!valid);
  };

  const handleClick = (e) => {
    e.preventDefault();
    Swal.close();
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...petForm.images];
    updatedImages.splice(index, 1);
    setPetForm((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
    setImageSrc(pet.image);
    setShowImg(false);
    setShowImg(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(petForm).forEach(([key, value]) => {
      if (key === "images") {
        // Si el campo es "images", agregamos cada archivo al FormData

        value.forEach((image) => formDataToSend.append("images", image));
      } else {
        // Para otros campos del formulario, simplemente los agregamos al FormData
        if (key !== "image") {
          formDataToSend.append(key, value);
        }
      }
    });

    const sendBack = await axios.put(`/mascota/${pet.id}`, formDataToSend);

    if (sendBack.status === 200) {
      Swal.fire({
        title: "Datos Actualizados",
        icon: "success",
        width: "400px",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      getPets();
    } else {
      console.error("Error al enviar datos al servidor", sendBack.data);
      Swal.fire({
        title: "Ha ocurrido un error",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      getPets();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-center">
            <div className="flex items-center mr-2">
              {showImg && (
                <div className="relative">
                  <img src={imageSrc} className="h-32 w-32 object-cover mr-2" />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(0)}
                    className="absolute top-0 right-0 bg-red-500 text-white font-bold py-1 px-2 rounded-full"
                  >
                    X
                  </button>
                </div>
              )}
            </div>

            <div className="w-32">
              <input
                type="file"
                accept="image/*"
                name="images"
                id="images"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="flex justify-center relative px-4 bg-slate-200 rounded-lg cursor-pointer border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
              >
                <span className="m-2">Cambiar foto</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div>
              <label>
                Nombre:{" "}
                <input
                  type="text"
                  name="name"
                  value={petForm.name}
                  onChange={handleChange}
                />
              </label>
              <p>{errors.name}</p>
            </div>

            <div>
              <div className="">
                <label>
                  Tipo:{" "}
                  <select
                    name="type"
                    value={petForm.type}
                    onChange={handleChange}
                  >
                    <option value="Dog">Perro</option>
                    <option value="Cat">Gato</option>
                    <option value="Reptil">Reptil</option>
                    <option value="Caballo">Caballo</option>
                  </select>
                </label>
              </div>
              <p>{errors.type}</p>
            </div>

            <div>
              <label>
                Edad:{" "}
                <input
                  type="number"
                  name="age"
                  min={1}
                  max={15}
                  value={petForm.age}
                  onChange={handleChange}
                />
              </label>
              <p>{errors.age}</p>
            </div>

            <div>
              <label>
                Raza:{" "}
                <input
                  type="text"
                  name="raze"
                  value={petForm.raze}
                  onChange={handleChange}
                />
              </label>
              <p>{errors.raze}</p>
            </div>

            <div>
              <label>
                Sexo:{" "}
                <select
                  name="genre"
                  value={petForm.genre}
                  onChange={handleChange}
                >
                  <option value="she">Femenino</option>
                  <option value="he">Masculino</option>
                </select>
              </label>

              <p>{errors.genre}</p>
            </div>

            <div>
              <label>
                Tamaño:{" "}
                <select
                  name="size"
                  value={petForm.size}
                  onChange={handleChange}
                >
                  <option value="Grande">Grande</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Pequeño">Pequeño</option>
                </select>
              </label>

              <p>{errors.size}</p>
            </div>

            <div>
              <div>
                <label>Tu mascota es agresiva? </label>

                <label htmlFor="agresividadSI">
                  si
                  <input
                    onChange={handleChange}
                    id="agresividadSI"
                    name="aggressiveness"
                    type="radio"
                    value={true}
                  ></input>
                </label>

                <label htmlFor="agresividadNO">
                  no
                  <input
                    onChange={handleChange}
                    id="agresividadNO"
                    name="aggressiveness"
                    type="radio"
                    value={false}
                  ></input>
                </label>
              </div>
              <p>{errors.aggressiveness}</p>
            </div>

            <div>
              <label>Convive con otras mascotas? </label>

              <label htmlFor="convivenciaSI">
                si
                <input
                  onChange={handleChange}
                  id="convivenciaSI"
                  name="coexistence"
                  type="radio"
                  value={true}
                ></input>
              </label>
              <label htmlFor="convivenciaNO">
                no
                <input
                  onChange={handleChange}
                  id="convivenciaNO"
                  name="coexistence"
                  type="radio"
                  value={false}
                ></input>
              </label>

              <p>{errors.coexistence}</p>
            </div>
          </div>
        </div>
        <div>
          <button disabled={disabledSubmit}>PetUpdate</button>
          <button onClick={handleClick}>Cancelar Cambios</button>
        </div>
      </form>
    </div>
  );
};

export default PetUpdate;
