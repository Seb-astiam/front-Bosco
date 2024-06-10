import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTiposAlojamientos } from "../../Hooks/useTiposAlojamientos";
import { useLocationProvincias } from "../../Hooks/useLocationProvincias";
import useCities from "../../Hooks/useCities";
import { useServices } from "../../Hooks/useServices";
import axios from 'axios'
import Switch from "react-switch";

export const HousingUpdate = ({alojamiento, getHousings }) => {
    useTiposAlojamientos();
    useLocationProvincias();
    useCities();
    useServices();

    const [housingForm, setHousingForm] = useState({ ...alojamiento});
    const [form, setForm] = useState({...housingForm})
    const TiposHost = useSelector((state) => state.storage.TipoAlojamientos);
    const provincias = useSelector((state) => state.storage.AllProvinces);
    const services = useSelector((state) => state.storage.AllService);
    const selectedProvince = housingForm.provinces;
    const cities = useCities(selectedProvince ? selectedProvince : null);

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
        Services: ""
      });

      const validate = (input) => {
        const newErrors = {};
    
        if (input.hourly) {
            newErrors.accommodationType = input.accommodationType === "" ? "No registraste el tipo de acomodación!" : "";
            newErrors.hourAvailable = input.hourAvailable === "" ? "Selecciona hora de entrada" : "";
            newErrors.hourEnd = input.hourEnd === "" ? "Selecciona hora de salida" : "";
            newErrors.provinces = input.provinces === "" ? "Debe indicar la provincia" : "";
            newErrors.cities = input.cities === "" ? "Debe indicar la ciudad" : "";
            newErrors.price = input.price === "" ? "Debe colocar un precio" : "";
            newErrors.square = input.square === "" ? "Determine el numero de plazas disponibles" : "";
            newErrors.title = input.title === "" ? "Coloque un nombre a su alojamiento" : "";
            newErrors.images = input.images.length < 3 ? "Debe Agregar por lo menos 3 imagenes!" : "";
            newErrors.Services = input.Services.length < 1 ? "Debes añadir por lo menos un servicio" : "";
        } else {
            newErrors.accommodationType = input.accommodationType === "" ? "No registraste el tipo de acomodación!" : "";
            newErrors.datesAvailable = input.datesAvailable === "" ? "Selecciona fecha de inicio" : "";
            newErrors.datesEnd = input.datesEnd === "" ? "Selecciona fecha de fin" : "";
            newErrors.provinces = input.provinces === "" ? "Debe indicar la provincia" : "";
            newErrors.cities = input.cities === "" ? "Debe indicar la ciudad" : "";
            newErrors.price = input.price === "" ? "Debe colocar un precio" : "";
            newErrors.square = input.square === "" ? "Determine el numero de plazas disponibles" : "";
            newErrors.title = input.title === "" ? "Coloque un nombre a su alojamiento" : "";
            newErrors.images = input.images.length < 3 ? "Debe Agregar por lo menos 3 imagenes!" : "";
            newErrors.Services = input.Services.length < 1 ? "Debes añadir por lo menos un servicio" : "";
        }
    
        setErrors(newErrors);
        const valid = Object.values(newErrors).every((error) => error === "");
        return valid;
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

        setForm((prevData) => ({
            ...prevData,
            [name]: newValues || "",
        }));

        setHousingForm((prevData) => {
            const updatedForm = {
                ...prevData,
                [name]: newValues || "",
            };
    
            if (name === 'hourly') {
                if (value) {
                    updatedForm.datesAvailable = "";
                    updatedForm.datesEnd = "";
                } else {
                    updatedForm.hourAvailable = "";
                    updatedForm.hourEnd = "";
                }
            }
    
            const valid = validate(updatedForm);
            setDisableSubmit(!valid);

            return updatedForm;
        });
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
    Object.entries(form).forEach(([key, value]) => {
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

    const handleHourlyChange = (checked) => {
        setHousingForm({ ...housingForm, hourly: checked });
    }

    const handleServiceRemove = (idService) => {
        setHousingForm((prevData) => ({
            ...prevData,
            Services: prevData.Services.filter(service => service.id !== idService)
        }));

        setForm((prevForm) => ({
            ...prevForm,
            Services: prevForm.Services.filter(serviceId => serviceId !== idService)
        }));

        validate(housingForm)
    }

    useEffect(() => {
        // Convierte los objetos completos de servicios en IDs de servicios
        const serviceIds = housingForm.Services.map(service => service.id);
        setForm(prevForm => ({
            ...prevForm,
            Services: serviceIds
        }));
    }, [housingForm.Services]);

    const handleServiceAdd = (event) => {
        const selectedServiceId = event.target.value;
        const selectedService = services.find(service => service.id === parseInt(selectedServiceId));
    
        if (selectedService && !housingForm.Services.some(service => service.id === selectedService.id)) {
            setHousingForm((prevData) => ({
                ...prevData,
                Services: [...prevData.Services, selectedService]
            }));

            setForm((prevForm) => ({
                ...prevForm,
                Services: [...prevForm.Services, selectedServiceId]
            }));
        }
    };

    const availableServices = services.filter(service => 
        !housingForm.Services.some(selected => selected === service.id)
    );

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

            <div className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
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
                    Tipo de alojamiento:{" "}
                </label>

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
                
                <p className="text-red-600">{errors.accommodationType}</p>    
            </div>

            <div>
                <label
                htmlFor="provinces"
                className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
                >
                Provincia: {" "}
                    <select
                        name="provinces"
                        id="provinces"
                        onChange={handleChange}
                        value={housingForm.provinces}
                        className="w-[225px] outline-none"
                    >
                        <option value="" disabled selected>
                            Selecciona una provincia
                        </option>
                            {provincias.map((provincia) => (
                                <option value={provincia.nombre} key={provincia.id}>
                                    {provincia.nombre}
                                </option>
                            ))}
                    </select>
                </label>
                <p className="text-red-600">{errors.provinces}</p> 
            </div>

            <div>
                <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
                    Ciudad: {" "}
                    <select
                        id="cities"
                        value={housingForm.cities}
                        onChange={handleChange}
                        name="cities"
                        className="w-[225px] outline-none"
                    >
                        <option value="" disabled selected>
                            Selecciona una localidad
                        </option>
                        {cities.map((localidad) => (
                            <option value={localidad.name} key={localidad.id}>
                                {localidad.name}
                            </option>
                        ))}
                    </select>
                </label>
                <p className="text-red-600">{errors.cities}</p> 
            </div>

            <div className="flex flex-row justify-between  gap-4">
                <label
                htmlFor="square"
                className="flex items-center px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500 "
                >
                    Plazas
                    <input
                        placeholder="Cantidad de plazas"
                        type="number"
                        name="square"
                        id="square"
                        min="1"
                        max="20"
                        step="1"
                        onChange={handleChange}
                        value={housingForm.square}
                        className="w-[40px] outline-none ml-2"
                    />
                </label>

                <label
                htmlFor="price"
                className="flex items-center px-[15px] py-[8.5px] bg-[white] rounded-[20px] font-custom font-semibold text-[12px] text-gray-500 "
                >
                    Precio $
                    <input
                        type="number"
                        name="price"
                        id="price"
                        min="1000"
                        max="99000"
                        step="1000"
                        onChange={handleChange}
                        value={housingForm.price}
                        className="w-[55px] outline-none ml-2"
                    />
                </label>
          </div>
          <div className="flex flex-row">
                <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
                    {errors.square}
                </p>
                <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
                    {errors.price}
                </p>
          </div>

          <div className="flex flex-col items-center px-[15px]  bg-[white] rounded-t-[20px] ">
                <p className="font-custom font-semibold text-[12px] mb-[15px] text-gray-500">
                    Alojamiento por...
                </p>
                <div className="flex align-middle">
                    <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 mr-3">
                        Días
                    </span>
                    <Switch
                        onChange={handleHourlyChange}
                        checked={housingForm.hourly}
                        onColor="#eb662b"
                        offColor="#eb662b"
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={20}
                        width={40}
                        handleDiameter={16}
                    />
                    <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 ml-3">
                        Horas
                    </span>
                </div>

                {housingForm.hourly ? (
                    <div className="flex flex-row">
                        <label
                            htmlFor="datesAvailable"
                            className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-bl-[20px] "
                        >
                            <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                                Hora de inicio
                            </a>
                            <input
                                type="number"
                                name="hourAvailable"
                                id="hourAvailable"
                                onChange={handleChange}
                                value={housingForm.hourAvailable || ""}
                                min={0}
                                max={housingForm.hourEnd}
                                step={1}
                                className="outline-none w-12"
                            />
                        </label>

                        <label
                            htmlFor="datesEnd"
                            className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-br-[20px] "
                        >
                            <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                                Hora de fin
                            </a>
                            <input
                                type="number"
                                name="hourEnd"
                                id="hourEnd"
                                onChange={handleChange}
                                value={housingForm.hourEnd || ""}
                                min={housingForm.hourAvailable}
                                step={1}
                                max={24}
                                className="outline-none w-12"
                            />
                        </label>
                    </div>
                        ) : (
                    <div className="flex flex-row">
                        <label
                            htmlFor="datesAvailable"
                            className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-bl-[20px] "
                        >
                            <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                                Fecha de inicio
                            </a>
                            <input
                                type="date"
                                name="datesAvailable"
                                id="datesAvailable"
                                onChange={handleChange}
                                value={housingForm.datesAvailable || ""}
                                max={housingForm.datesEnd}
                                className="outline-none"
                            />
                        </label>

                        <label
                            htmlFor="datesEnd"
                            className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-br-[20px] "
                        >
                            <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
                                Fecha de fin
                            </a>
                            <input
                                type="date"
                                name="datesEnd"
                                id="datesEnd"
                                onChange={handleChange}
                                value={housingForm.datesEnd || ""}
                                min={housingForm.datesAvailable}
                                className="outline-none"
                            />
                        </label>

                        {housingForm.hourly ? (
                            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
                                {errors.hourAvailable}
                            </p>
                        ) : (
                            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
                                {errors.datesAvailable}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="font-custom">
                <label>
                    Servicios:

                    <select
                        name="Services"
                        id="Services"
                        onChange={handleServiceAdd}
                        className="w-[225px] outline-none"
                    >
                        <option value="">
                            Selecciona tus servicios
                        </option>
                            {availableServices.map((service) => (
                                <option value={service.id} key={service.id}>
                                    {service.type}
                                </option>
                            ))}
                    </select>
                </label>
                    

                {housingForm.Services.map((serviciosHousing) => {
                    return <div id={serviciosHousing.id} className="flex">
                    <p>{serviciosHousing.type}</p>
                    <button
                        type="button"
                        onClick={() => handleServiceRemove(serviciosHousing.id)}
                        className="cursor-pointer "
                    >
                        X
                    </button>
                    </div>
                })}

                <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
                    {errors.Services}
                </p>
            </div>
            
            <div className="flex items-center justify-between">
                <button
                    // type="submit"
                    // className={`font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 ${
                    //     disabledSubmit
                    //     ? "bg-[transparent] text-black shadow-md"
                    //     : "bg-[black] text-white shadow-md"
                    // }`}
                    // disabled={disabledSubmit}
                >
                    Enviar
                </button>
          </div>

               

        </form>
    </div>
  )
    
}

