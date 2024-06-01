import { useState } from "react";
import { useSelector } from "react-redux";
import { useTiposAlojamientos } from "../../Hooks/useTiposAlojamientos";

export const HousingUpdate = ({alojamiento, getHousings }) => {
    useTiposAlojamientos();

    const TiposHost = useSelector((state) => state.storage.TipoAlojamientos);
    const [housingForm, setHousingForm] = useState({ ...alojamiento});
    const [disabledSubmit, setDisableSubmit] = useState(true);
    const [imageSrc, setImageSrc] = useState(housingForm.images);

    const [errors, setErrors] = useState({
        accommodationType: "", 
        datesAvailable: "", 
        datesEnd: "", 
        images: "", 
        provinces: "", 
        cities: "", 
        price: "", 
        square: "", 
        title: "", 
        hourly: "",
        hourEnd: "",
        hourAvailable: "",
        images: ""
      });

    const validate = (input) => {
        console.log(input, 'errores')
        if(input.hourly){
            setErrors((prevErrors) => {
                return {
                  ...prevErrors,
                  accommodationType: input.accommodationType === "" ? "No registraste el tipo de acomodación!" : "",
                  hourAvailable: input.hourAvailable === "" ? "Selecciona hora de entrada" : "",
                  hourEnd: input.hourEnd === "" ? "Selecciona hora de salida" : "",
                  provinces: input.provinces === "" ? "Debe indicar la provincia" : "",
                  cities: input.cities === "" ? "Debe indicar la ciudad" : "",
                  price: input.price === "" ? "Debe colocar un precio" : "",
                  square: input.square === "" ? "Determine el numero de plazas disponibles" : "",
                  title: input.title === "" ? "Coloque un nombre a su alojamiento" : "",
                  images: input.images.length < 3 ? "Debe Agregar por lo menos 3 imagenes!" : ""
                };
              });
    
                const valid = Object.values({
                ...errors,
                accommodationType: input.accommodationType === "" ? "No registraste el tipo de acomodación!" : "",
                hourAvailable: input.hourAvailable === "" ? "Selecciona hora de entrada" : "",
                hourEnd: input.hourEnd === "" ? "Selecciona hora de salida" : "",
                provinces: input.provinces === "" ? "Debe indicar la provincia" : "",
                cities: input.cities === "" ? "Debe indicar la ciudad" : "",
                price: input.price === "" ? "Debe colocar un precio" : "",
                square: input.square === "" ? "Determine el numero de plazas disponibles" : "",
                title: input.title === "" ? "Coloque un nombre a su alojamiento" : "",
                images: input.images.length < 3 ? "Debe Agregar por lo menos 3 imagenes!" : ""
                }).every((error) => error === "");
    
                return valid;
            } else {
                setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    accommodationType: input.accommodationType === "" ? "No registraste el tipo de acomodación!" : "",
                    datesAvailable: input.datesAvailable === "" ? "Selecciona fecha de inicio" : "",
                    datesEnd: input.datesEnd === "" ? "Selecciona fecha de fin" : "",
                    provinces: input.provinces === "" ? "Debe indicar la provincia" : "",
                    cities: input.cities === "" ? "Debe indicar la ciudad" : "",
                    price: input.price === "" ? "Debe colocar un precio" : "",
                    square: input.square === "" ? "Determine el numero de plazas disponibles" : "",
                    title: input.title === "" ? "Coloque un nombre a su alojamiento" : "",
                    images: input.images.length < 3 ? "Debe Agregar por lo menos 3 imagenes!" : ""
                };
                });
        
                const valid = Object.values({
                    ...errors,
                    accommodationType: input.accommodationType === "" ? "No registraste el tipo de acomodación!" : "",
                    datesAvailable: input.datesAvailable === "" ? "Selecciona fecha de inicio" : "",
                    datesEnd: input.datesEnd === "" ? "Selecciona fecha de fin" : "",
                    provinces: input.provinces === "" ? "Debe indicar la provincia" : "",
                    cities: input.cities === "" ? "Debe indicar la ciudad" : "",
                    price: input.price === "" ? "Debe colocar un precio" : "",
                    square: input.square === "" ? "Determine el numero de plazas disponibles" : "",
                    title: input.title === "" ? "Coloque un nombre a su alojamiento" : "",
                    images: input.images.length < 3 ? "Debe Agregar por lo menos 3 imagenes!" : ""
                }).every((error) => error === "");

                return valid;
            }
        };

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        let newValues;
        if (name === "images") {
            const newFiles = Array.from(files).slice(0, 3 - housingForm.images.length);
            newValues = [
                ...housingForm.images,
                newFiles
            ];
            const newImageSrcs = newFiles.map(file => URL.createObjectURL(file));

            setImageSrc([...imageSrc, ...newImageSrcs]);
        } else {
            newValues = value;
        }
    
        setHousingForm({
            ...housingForm,
            [name]: newValues,
        });
    
        const valid = validate({
            ...housingForm,
            [name]: newValues,
        });

        setDisableSubmit(!valid);
    };

    const handleImageRemove = (index) => {
        const updatePrevisualizacion = [...imageSrc];
        updatePrevisualizacion.splice(index, 1)

        const updatedImages = [...housingForm.images];
        updatedImages.splice(index, 1);

        setHousingForm((prevData) => ({
          ...prevData,
          images: updatedImages,
        }));

        validate({
            ...housingForm,
            images: updatedImages,
        });

        setImageSrc(updatePrevisualizacion)
    };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(housingForm).forEach(([key, value]) => {
      if (key === "images") {
        // Si el campo es "images", agregamos cada archivo al FormData

        value.forEach((image) => formDataToSend.append("images", image));
      } else {
        // Para otros campos del formulario, simplemente los agregamos al FormData
        if (key !== "images") {
          formDataToSend.append(key, value);
        }
      }
    });

    const sendBack = await axios.put(`/profileHousing/update/${alojamiento.id}`, formDataToSend);

    if (sendBack.status === 200) {
      Swal.fire({
        title: "Datos Actualizados",
        icon: "success",
        width: "400px",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      getHousings();
    } else {
      console.error("Error al enviar datos al servidor", sendBack.data);
      Swal.fire({
        title: "Ha ocurrido un error",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      getHousings();
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <div className="flex ">
                    {imageSrc.map((img, index) => {
                        return (
                            <div className="flex flex-col gap-4 items-center">
                                <button
                                    type="button"
                                    onClick={() => handleImageRemove(index)}
                                    className="cursor-pointer w-10"
                                >
                                    X
                                </button>
                                <img src={img} className="h-32 w-32 object-cover mr-2"></img>
                            </div>
                        )
                    })}
                </div>
                <p className="text-red-600">{errors.images}</p>

                <label
                    htmlFor="images"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Imagenes
                </label>
                <input
                    type="file"
                    accept="image/*"
                    name="images"
                    id="images"
                    onChange={handleChange}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    multiple
                />
            </div>

            <div>
                <label>
                    Nombre:{" "}
                    <input
                        type="text"
                        name="title"
                        value={housingForm.title}
                        onChange={handleChange}
                    />
                </label>
                <p className="text-red-600">{errors.title}</p>
            </div>

            <div>
                <label
                htmlFor="accommodationType"
                className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
                >
                    <select
                        name="accommodationType"
                        id="accommodationType"
                        onChange={handleChange}
                        value={housingForm.accommodationType}
                        className="w-[225px] outline-none"
                    >
                        <option value="" disabled selected>
                            Selecciona un tipo de alojamiento
                        </option>
                        {TiposHost.map((tipo) => {
                            return (
                                <option key={tipo.id} value={tipo.type}>
                                    {tipo.type}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <p className="text-red-600">{errors.accommodationType}</p>    
            </div>

        </form>
    </div>
  )
    
}

