// import React, { useState, useEffect } from "react";
// // import axios from "axios";
// import Swal from "sweetalert2";
// import Switch from "react-switch";
// import bosco from "../../../assets/bosco-logo.jpeg"
// import { ValidateFormdata } from "./validate";
// import { useLocationProvincias } from "../../../Hooks/useLocationProvincias";
// import { useTiposAlojamientos } from "../../../Hooks/useTiposAlojamientos"
// import { useServices } from "../../../Hooks/useServices";
// import { useSelector } from "react-redux";
// import useCities from "../../../Hooks/useCities";

// const HousingForm = () => {
//   useServices();
//   useLocationProvincias();
//   useCities();
//   useTiposAlojamientos();

//   const TiposHost = useSelector((state) => state.storage.TipoAlojamientos);
//   const provincias = useSelector((state) => state.storage.AllProvinces);
//   const services = useSelector((state) => state.storage.AllService);

//   const email = JSON.parse(localStorage.getItem("user")).email;
//   const [formData, setFormData] = useState({
//     title: "",
//     provinces: "",
//     cities: "",
//     hourly: false,
//     hourAvailable: "",
//     hourEnd: "",
//     datesAvailable: "",
//     datesEnd: "",
//     price: "",
//     accommodationType: "",
//     services: [],
//     square: "",
//     images: [],
//   });

//   //para poder ver si se estaba actualizando el estado correctamente.

//   // manejo del boton de submit
//   const [disableSubmit, setDisableSubmit] = useState(true);
//   // const errorMessages = Object.values(errors);
//   // setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     setShow(true);
//   }, [formData]);

//   const [errors, setErrors] = useState({});
//   const handleChange = (e) => {
//     const { name, files, type, checked } = e.target;

//     let newValue;

//     if (name === "images") {
//       newValue = [
//         ...formData.images,
//         ...Array.from(files).slice(0, 3 - formData.images.length),
//       ];
//     } else if (type === "checkbox") {
//       newValue = checked
//         ? [...formData.services, e.target.value]
//         : formData.services.filter((service) => service !== e.target.value);
//     } else {
//       newValue = e.target.value;
//     }
//     console.log(newValue);
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: newValue,
//     }));

//     const validationErrors = ValidateFormdata({
//       ...formData,
//       [name]: newValue, // Actualiza el valor cambiado en el objeto formData
//     });

//     setErrors(validationErrors);
//     const errorMessages = Object.values(validationErrors);
//     setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
//   };

//   const handleServiceChange = (e) => {
//     const { value, checked } = e.target;
//     const serviceId = parseInt(value); // Convertimos el valor a número
//     setFormData((prevData) => ({
//       ...prevData,
//       services: checked
//         ? [...prevData.services, serviceId] // Convertimos el ID a cadena
//         : prevData.services.filter((service) => service !== serviceId), // Convertimos el ID a cadena
//     }));
//   };

//   const handleImageRemove = (index) => {
//     const updatedImages = [...formData.images];
//     updatedImages.splice(index, 1);
//     setFormData((prevData) => ({
//       ...prevData,
//       images: updatedImages,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "images") {
//         // Si el campo es "images", agregamos cada archivo al FormData
//         value.forEach((image) => formDataToSend.append("images", image));
//       } else {
//         // Para otros campos del formulario, simplemente los agregamos al FormData
//         formDataToSend.append(key, value);
//       }
//     });

//     try {
//       const response = await axiosJwt.post(
//         `http://localhost:3001/profileHousing/register?email=${email}`,
//         formDataToSend
//       );

//       if (
//         response.status === 201 &&
//         response.data.message === "Datos recibidos correctamente"
//       ) {
//         // Mostrar SweetAlert de éxito
//         Swal.fire({
//           icon: "success",
//           title: "¡Registro Exitoso!",
//           text: "Los datos del alojamiento han sido registrados correctamente.",
//         });
//         if (show) setShow(false);
//         clearFormData();
//       }

//       console.log(response);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const clearFormData = () => {
//     setFormData({
//       title: "",
//       provinces: "",
//       cities: "",
//       datesAvailable: "",
//       datesEnd: "",
//       price: "",
//       accommodationType: "",
//       services: [],
//       square: 0,
//       images: [],
//     });
//   };

//   /****************************** */
//   // Obtener las ciudades según la provincia seleccionada
//   const selectedProvince = formData.provinces;
//   const cities = useCities(selectedProvince ? selectedProvince : null);

//   return (
//     <div className="flex  justify-center items-center mq900:mb-10 mq900:flex-col  mq900:h-full h-[1005px] w-full my-[50px] mq900:mt-0">
//       <div className="flex justify-center h-full w-[50%] rounded-bl-[20px] rounded-tl-[20px] max-w-[95%] mq900:max-w-[95%] mq900:w-[95%] mq900:h-[350px] mq900:rounded-bl-[0px] mq900:rounded-tr-[20px] ">
//         <img
//           src={bosco}
//           alt="bosco"
//           className="w-full h-[1005px] object-cover mq900:mt-10 rounded-tl-[20px] rounded-bl-[20px] mq900:rounded-bl-[0px] mq900:rounded-tr-[20px] mq900:h-[350px]"
//         />
//       </div>
//       <div className="flex flex-col items-center justify-center px-[50px] mq900:px-0 rounded-br-[20px] rounded-tr-[20px] mq900:rounded-tr-[0px] mq900:rounded-bl-[20px] mq900:w-[95%] mq900:max-w-[95%] h-[1005px] w-[400px] !bg-[#FEB156] max-w-[400px]">
//         <h2 className="font-custom font-extrabold">Registrar alojamiento</h2>
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col items-center my-[0%] px-[5%] mq900:px-0 justify-center rounded-br-[20px] rounded-tr-[20px] w-[100%]"
//           encType="multipart/form-data"
//         >
//           <div>
//             <label
//               htmlFor="title"
//               className="flex flex-grow px-[10px] py-[5px] bg-[white] rounded-[20px]"
//             >
//               <box-icon name="home" title="Nombre del alojamiento"></box-icon>
//               <input
//                 placeholder="Nombre del alojamiento"
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className={`w-[80%] ${errors.title ? "border-red-500" : ""
//                   }`}
//               />
//               {!errors.title && formData.title && (
//                 <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-green-500">
//                   <span role="img" aria-label="check">
//                     {" "}
//                     ✔️{" "}
//                   </span>
//                 </div>
//               )}
//             </label>


//             {errors.title && (
//               <span className="text-red-500 text-sm">{errors.title}</span>
//             )}
//           </div>

//           <div className="mb-4 relative">
//             <label
//               htmlFor="location"
//               className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
//             >
//               <box-icon name="map" title="Ubicación"></box-icon>

//               <select
//                 name="location"
//                 id="location"
//                 onChange={handleChange}
//                 value={formData.location}
//                 className={`border-none appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.location ? "border-red-500" : ""
//                   }`}
//               >
//                 <option value="">Ubicación</option>
//                 {provincias.map((provincia) => {
//                   return (
//                     <option value={provincia.nombre} key={provincia.id}>
//                       {provincia.nombre}
//                     </option>
//                   );
//                 })}
//               </select>
//             </label>
//             {!errors.location && formData.location && (
//               <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-green-500">
//                 <span role="img" aria-label="check">
//                   ✔️
//                 </span>
//               </div>
//             )}
//             {errors.location && (
//               <span className="text-red-500 text-sm italic">
//                 {errors.location}
//               </span>
//             )}
//           </div>
//           <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
//             {errors.cities}
//           </p>
//           <div>
//             <div className="flex flex-col items-center px-[15px]  bg-[white] rounded-t-[20px] ">
//               <p className="font-custom font-semibold text-[12px] mb-[15px] text-gray-500">
//                 Alojamiento por...
//               </p>
//               <div className="flex align-middle">
//                 <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 mr-3">
//                   Días
//                 </span>
//                 <Switch
//                   onChange={(checked) =>
//                     setFormData({ ...formData, hourly: checked })
//                   }
//                   checked={formData.hourly}
//                   onColor="#eb662b"
//                   offColor="#eb662b"
//                   checkedIcon={false}
//                   uncheckedIcon={false}
//                   height={20}
//                   width={40}
//                   handleDiameter={16}
//                 />
//                 <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 ml-3">
//                   Horas
//                 </span>
//               </div>
//             </div>

//             {formData.hourly ? (
//               <div className="flex flex-row">
//                 <label
//                   htmlFor="datesAvailable"
//                   className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-bl-[20px] "
//                 >
//                   <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
//                     Hora de inicio
//                   </a>
//                   <input
//                     type="number"
//                     name="hourAvailable"
//                     id="hourAvailable"
//                     onChange={handleChange}
//                     value={formData.hourAvailable}
//                     min={0}
//                     max={formData.hourEnd}
//                     step={1}
//                     className="outline-none w-12"
//                   />
//                 </label>
//                 <label
//                   htmlFor="datesEnd"
//                   className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-br-[20px] "
//                 >
//                   <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
//                     Hora de fin
//                   </a>
//                   <input
//                     type="number"
//                     name="hourEnd"
//                     id="hourEnd"
//                     onChange={handleChange}
//                     value={formData.hourEnd}
//                     min={formData.hourAvailable}
//                     step={1}
//                     max={24}
//                     className="outline-none w-12"
//                   />
//                 </label>
//               </div>
//             ) : (
//               <div className="flex flex-row">
//                 <label
//                   htmlFor="datesAvailable"
//                   className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-bl-[20px] "
//                 >
//                   <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
//                     Fecha de inicio
//                   </a>
//                   <input
//                     type="date"
//                     name="datesAvailable"
//                     id="datesAvailable"
//                     onChange={handleChange}
//                     value={formData.datesAvailable}
//                     max={formData.datesEnd}
//                     className="outline-none"
//                   />
//                 </label>
//                 <label
//                   htmlFor="datesEnd"
//                   className="flex w-[110px] flex-col items-center px-[15px] py-[10px] bg-[white] rounded-br-[20px] "
//                 >
//                   <a className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500">
//                     Fecha de fin
//                   </a>
//                   <input
//                     type="date"
//                     name="datesEnd"
//                     id="datesEnd"
//                     onChange={handleChange}
//                     value={formData.datesEnd}
//                     min={formData.datesAvailable}
//                     className="outline-none"
//                   />
//                 </label>
//               </div>
//             )}
//           </div>
//           {formData.hourly ? (
//             <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
//               {errors.hourAvailable}
//             </p>
//           ) : (
//             <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
//               {errors.datesAvailable}
//             </p>
//           )}
//           <div className="flex flex-row justify-between  gap-4">
//             <label
//               htmlFor="square"
//               className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
//             >
//               <box-icon type='solid' title="Cantidad de plazas" name='cat'></box-icon>

//               {/* <p className="m-[0px] w-[180px]">
//               Cantidad de plazas
//             </p> */}
//               <input
//                 placeholder="Cantidad de plazas"
//                 type="number"
//                 name="square"
//                 id="square"
//                 onChange={handleChange}
//                 value={formData.square}
//                 className={`appearance-none border-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.square ? "border-red-500" : ""
//                   }`}
//               />
//             </label>
//             {!errors.square && formData.square > 0 && (
//               <div className="mr-3 text-green-500">
//                 <span role="img" aria-label="check">
//                   ✔️
//                 </span>
//               </div>
//             )}
//             {errors.square && (
//               <p className="text-red-500 text-xs italic">{errors.square}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="price"
//               className="relative flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
//             >
//               <box-icon name="money" title="Precio/Hora"></box-icon>

//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Precio/hora"
//                 id="price"
//                 onClick={() => { setSelected(...selected, precioHora = true) }}
//                 onChange={handleChange}
//                 value={formData.price}
//                 className={`appearance-none border-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? "border-red-500" : ""
//                   }`}
//               />
//             </label>
//             {!errors.price && formData.price && (
//               <div className=" mr-3 text-green-500">
//                 <span role="img" aria-label="check">
//                   ✔️
//                 </span>
//               </div>
//             )}
//             {errors.price && (
//               <p className="text-red-500 text-xs italic">{errors.price}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="accommodationType"
//               className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
//             >
//               <box-icon name='building-house' title="Tipo de alojamiento"></box-icon>

//               {/* <p className="m-[0px] w-[180px]">
//               Tipo de Alojamiento
//             </p> */}

//               <select
//                 name="accommodationType"
//                 id="accommodationType"
//                 onChange={handleChange}
//                 value={formData.accommodationType}
//                 className={`appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.accommodationType ? "border-red-500" : ""
//                   }`}
//               >
//                 <option value="">Seleccionar tipo de alojamiento</option>
//                 <option value="Cabaña">Cabaña</option>
//                 <option value="Hotel">Hotel</option>
//                 <option value="Casa Rural">Casa Rural</option>
//               </select>
//             </label>
//             {!errors.accommodationType && formData.accommodationType && (
//               <div className=" mr-3 text-green-500">
//                 <span role="img" aria-label="check">
//                   ✔️
//                 </span>
//               </div>
//             )}
//             {errors.accommodationType && (
//               <p className="text-red-500 text-xs italic">
//                 {errors.accommodationType}
//               </p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block  text-gray-700 text-sm font-bold mb-2">
//               Servicios
//             </label>
//             <div
//               className={`appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.services ? "border-red-500" : ""
//                 }`}
//             >
//               <div>
//                 {services &&
//                   services.map((service) => (
//                     <label
//                       key={service.id}
//                       className={`flex items-center w-[100px] px-2 py-1 font-custom font-semibold text-[12px] rounded-[20px] border border-solid border-[#e7e6e6] 
//                       ${
//                         formData.services.includes(service.id)
//                           ? "bg-[#e7e6e6] border-none"
//                           : ""
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         name="services"
//                         value={service.id}
//                         onChange={handleServiceChange}
//                         className="form-checkbox h-5 w-5 text-gray-600"
//                       />
//                       <span className="ml-2 text-gray-700">{service.type}</span>
//                     </label>
//                   ))}
//               </div>
//             </div>

//             {/* <div className="mt-2">
//               {formData.services.map((serviceId, index) => {
//                 console.log("Selected service formdata:", formData.services);
//                 const selectedService = servicesA.find(
//                   (service) => service.id === serviceId
//                 );
//                 console.log("Selected service:", selectedService);
//                 return (
//                   <span
//                     key={index}
//                     className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
//                   >
//                     {selectedService ? selectedService.type : ""}
//                   </span>
//                 );
//               })}
//             </div> */}
//             {/* {!errors.services && formData.services.length > 0 && (
//               <div className=" mr-3 text-green-500">
//                 <span role="img" aria-label="check">
//                   ✔️
//                 </span>
//               </div>
//             )} */}
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="images"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Imágenes (mínimo 3)
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               name="images"
//               id="images"
//               onChange={handleChange}
//               className="hidden"
//               multiple
//             />
//             <label
//               htmlFor="images"
//               className="flex justify-center relative px-4 bg-white rounded-lg cursor-pointer border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
//             >
//               <span className="m-2">Seleccionar archivos</span>

//             </label>

//             {formData.images.length > 0 && (
//               <div className="mb-4">
//                 <p className="text-gray-700 text-sm font-bold mb-2">
//                   Previsualización de Imágenes:
//                 </p>
//                 <div className="flex">
//                   {formData.images.map((image, index) => (
//                     <div key={index} className="flex items-center mr-2">
//                       <div className="relative">
//                         <img
//                           src={URL.createObjectURL(image)}
//                           alt={`Imagen ${index + 1}`}
//                           className="h-16 w-16 object-cover mr-2"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => handleImageRemove(index)}
//                           className="absolute top-0 right-0 bg-red-500 text-white font-bold py-1 px-2 rounded-full"
//                         >
//                           X
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                   {[...Array(3 - formData.images.length)].map((_, index) => (
//                     <div
//                       key={index}
//                       className="h-16 w-16 border border-gray-300 flex items-center justify-center rounded-md mr-2"
//                     >
//                       <span className="text-gray-400 text-xs">
//                         Imagen {formData.images.length + index + 1}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {errors.images && (
//               <p className="text-red-500 text-xs italic">{errors.images}</p>
//             )}
//             <button
//               type="submit"
//               className="font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 bg-[black] text-white shadow-md"
//               disabled={disableSubmit}
//             >
//               Enviar
//             </button>
//           </div>
//           <div className="">
//           </div>
//         </form>
//       </div>
//     </div >
//   );
// };

// export default HousingForm;

import React, { useState, useEffect } from "react";
// import axios from "axios";
import Swal from "sweetalert2";
import Switch from "react-switch";
import { ValidateFormdata } from "./validate";
import { useLocationProvincias } from "../../../Hooks/useLocationProvincias";
import { useServices } from "../../../Hooks/useServices";
import { useSelector } from "react-redux";
import useCities from "../../../Hooks/useCities";
import bosco from "../../../assets/bosco-logo.jpeg";
import { useTiposAlojamientos } from "../../../Hooks/useTiposAlojamientos";
import axiosJwt from "../../../utils/axiosJwt";

const HousingForm = () => {
  useServices();
  useLocationProvincias();
  useCities();
  useTiposAlojamientos();

  const TiposHost = useSelector((state) => state.storage.TipoAlojamientos);
  const provincias = useSelector((state) => state.storage.AllProvinces);
  const services = useSelector((state) => state.storage.AllService);

  const email = JSON.parse(localStorage.getItem("user")).email;
  const [formData, setFormData] = useState({
    title: "",
    provinces: "",
    cities: "",
    hourly: false,
    hourAvailable: "",
    hourEnd: "",
    datesAvailable: "",
    datesEnd: "",
    price: "",
    accommodationType: "",
    services: [],
    square: "",
    images: [],
  });

  //para poder ver si se estaba actualizando el estado correctamente.

  // manejo del boton de submit
  const [disableSubmit, setDisableSubmit] = useState(true);
  // const errorMessages = Object.values(errors);
  // setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [formData]);

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, files, type, checked } = e.target;

    let newValue;

    if (name === "images") {
      newValue = [
        ...formData.images,
        ...Array.from(files).slice(0, 3 - formData.images.length),
      ];
    } else if (type === "checkbox") {
      newValue = checked
        ? [...formData.services, e.target.value]
        : formData.services.filter((service) => service !== e.target.value);
    } else {
      newValue = e.target.value;
    }
    console.log(newValue);
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    const validationErrors = ValidateFormdata({
      ...formData,
      [name]: newValue, // Actualiza el valor cambiado en el objeto formData
    });

    setErrors(validationErrors);
    const errorMessages = Object.values(validationErrors);
    setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    const serviceId = parseInt(value); // Convertimos el valor a número
    setFormData((prevData) => ({
      ...prevData,
      services: checked
        ? [...prevData.services, serviceId] // Convertimos el ID a cadena
        : prevData.services.filter((service) => service !== serviceId), // Convertimos el ID a cadena
    }));
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        // Si el campo es "images", agregamos cada archivo al FormData
        value.forEach((image) => formDataToSend.append("images", image));
      } else {
        // Para otros campos del formulario, simplemente los agregamos al FormData
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axiosJwt.post(
        `http://localhost:3001/profileHousing/register?email=${email}`,
        formDataToSend
      );

      if (
        response.status === 201 &&
        response.data.message === "Datos recibidos correctamente"
      ) {
        // Mostrar SweetAlert de éxito
        Swal.fire({
          icon: "success",
          title: "¡Registro Exitoso!",
          text: "Los datos del alojamiento han sido registrados correctamente.",
        });
        if (show) setShow(false);
        clearFormData();
      }

      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearFormData = () => {
    setFormData({
      title: "",
      provinces: "",
      cities: "",
      datesAvailable: "",
      datesEnd: "",
      price: "",
      accommodationType: "",
      services: [],
      square: 0,
      images: [],
    });
  };

  /********** */
  // Obtener las ciudades según la provincia seleccionada
  const selectedProvince = formData.provinces;
  const cities = useCities(selectedProvince ? selectedProvince : null);

  return (
    <div className="flex  justify-center items-center mq900:mb-10 mq900:flex-col  mq900:h-full h-[1005px] w-full my-[50px] mq900:mt-0">
      <div className="flex justify-center h-full w-[50%] rounded-bl-[20px] rounded-tl-[20px] max-w-[95%] mq900:max-w-[95%] mq900:w-[95%] mq900:h-[350px] mq900:rounded-bl-[0px] mq900:rounded-tr-[20px] ">
        <img
          src={bosco}
          alt="bosco"
          className="w-full h-[1005px] object-cover mq900:mt-10 rounded-tl-[20px] rounded-bl-[20px] mq900:rounded-bl-[0px] mq900:rounded-tr-[20px] mq900:h-[350px]"
        />
      </div>
      <div className="flex flex-col items-center justify-center px-[50px] mq900:px-0 rounded-br-[20px] rounded-tr-[20px] mq900:rounded-tr-[0px] mq900:rounded-bl-[20px] mq900:w-[95%] mq900:max-w-[95%] h-[1005px] w-[400px] !bg-[#FEB156] max-w-[400px]">
        <h2 className="font-custom font-extrabold">Registrar alojamiento</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center my-[0%] px-[5%] mq900:px-0 justify-center rounded-br-[20px] rounded-tr-[20px] w-[100%]"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="title"
              className="flex flex-grow px-[10px] py-[5px] bg-[white] rounded-[20px]"
            >
              <box-icon name="home" title="Nombre del alojamiento"></box-icon>
              <input
                placeholder="Nombre del alojamiento"
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-[80%] ${errors.title ? "border-red-500" : ""
                  }`}
              />
              {!errors.title && formData.title && (
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-green-500">
                  <span role="img" aria-label="check">
                    {" "}
                    ✔️{" "}
                  </span>
                </div>
              )}
            </label>


            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="location"
              className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
            >
              <box-icon name="map" title="Ubicación"></box-icon>

              <select
                name="location"
                id="location"
                onChange={handleChange}
                value={formData.location}
                className={`border-none appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.location ? "border-red-500" : ""
                  }`}
              >
                <option value="">Ubicación</option>
                {provincias.map((provincia) => {
                  return (
                    <option value={provincia.nombre} key={provincia.id}>
                      {provincia.nombre}
                    </option>
                  );
                })}
              </select>
            </label>
            {!errors.location && formData.location && (
              <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )}
            {errors.location && (
              <span className="text-red-500 text-sm italic">
                {errors.location}
              </span>
            )}
          </div>
          <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
            {errors.cities}
          </p>
          <div>
            <div className="flex flex-col items-center px-[15px]  bg-[white] rounded-t-[20px] ">
              <p className="font-custom font-semibold text-[12px] mb-[15px] text-gray-500">
                Alojamiento por...
              </p>
              <div className="flex align-middle">
                <span className="font-custom font-semibold text-[12px] mb-[10px] text-gray-500 mr-3">
                  Días
                </span>
                <Switch
                  onChange={(checked) =>
                    setFormData({ ...formData, hourly: checked })
                  }
                  checked={formData.hourly}
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
            </div>

            {formData.hourly ? (
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
                    value={formData.hourAvailable}
                    min={0}
                    max={formData.hourEnd}
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
                    value={formData.hourEnd}
                    min={formData.hourAvailable}
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
                    value={formData.datesAvailable}
                    max={formData.datesEnd}
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
                    value={formData.datesEnd}
                    min={formData.datesAvailable}
                    className="outline-none"
                  />
                </label>
              </div>
            )}
          </div>
          {formData.hourly ? (
            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
              {errors.hourAvailable}
            </p>
          ) : (
            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">
              {errors.datesAvailable}
            </p>
          )}
          <div className="flex flex-row justify-between  gap-4">

            <label
              htmlFor="square"
              className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
            >
              Plazas
              <input
                placeholder="Cantidad de plazas"
                type="number"
                name="square"
                id="square"
                onChange={handleChange}
                value={formData.square}
                className={`appearance-none border-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.square ? "border-red-500" : ""
                  }`}
              />
            </label>
            {!errors.square && formData.square > 0 && (
              <div className="mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )}
            {errors.square && (
              <p className="text-red-500 text-xs italic">{errors.square}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="relative flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
            >
              Precio $
              <input
                type="number"
                name="price"
                placeholder="Precio/hora"
                id="price"
                onClick={() => { setSelected(...selected, precioHora = true) }}
                onChange={handleChange}
                value={formData.price}
                className={`appearance-none border-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? "border-red-500" : ""
                  }`}
              />
            </label>
            {!errors.price && formData.price && (
              <div className=" mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )}
            {errors.price && (
              <p className="text-red-500 text-xs italic">{errors.price}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="accommodationType"
              className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
            >
              <box-icon name='building-house' title="Tipo de alojamiento"></box-icon>

              {/* <p className="m-[0px] w-[180px]">
              Tipo de Alojamiento
            </p> */}

              <select
                name="accommodationType"
                id="accommodationType"
                onChange={handleChange}
                value={formData.accommodationType}
                className={`appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.accommodationType ? "border-red-500" : ""
                  }`}
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
            {!errors.accommodationType && formData.accommodationType && (
              <div className=" mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )}
            {errors.accommodationType && (
              <p className="text-red-500 text-xs italic">
                {errors.accommodationType}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block  text-gray-700 text-sm font-bold mb-2">
              Servicios
            </label>
            <div
              className={`appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.services ? "border-red-500" : ""
                }`}
            >
              <div>
                {services &&
                  services.map((service) => (
                    <label
                      key={service.id}

                      className={`flex items-center w-[100px] px-2 py-1 font-custom font-semibold text-[12px] rounded-[20px] border border-solid border-[#e7e6e6] 
                      ${
                        formData.services.includes(service.id)
                          ? "bg-[#e7e6e6] border-none"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={service.id}
                        onChange={handleServiceChange}
                        className="form-checkbox h-5 w-5 text-gray-600"
                      />
                      <span className="ml-2 text-gray-700">{service.type}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* <div className="mt-2">
              {formData.services.map((serviceId, index) => {
                console.log("Selected service formdata:", formData.services);
                const selectedService = servicesA.find(
                  (service) => service.id === serviceId
                );
                console.log("Selected service:", selectedService);
                return (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  >
                    {selectedService ? selectedService.type : ""}
                  </span>
                );
              })}
            </div> */}
            {/* {!errors.services && formData.services.length > 0 && (
              <div className=" mr-3 text-green-500">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            )} */}
          </div>

          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Imágenes (mínimo 3)
            </label>

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
              className="flex justify-center relative px-4 bg-white rounded-lg cursor-pointer border border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:outline-none"
            >
              <span className="m-2">Seleccionar archivos</span>

            </label>

            {formData.images.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold mb-2">
                  Previsualización de Imágenes:
                </p>
                <div className="flex">
                  {formData.images.map((image, index) => (
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
                  {[...Array(3 - formData.images.length)].map((_, index) => (
                    <div
                      key={index}
                      className="h-16 w-16 border border-gray-300 flex items-center justify-center rounded-md mr-2"
                    >
                      <span className="text-gray-400 text-xs">
                        Imagen {formData.images.length + index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.images && (
              <p className="text-red-500 text-xs italic">{errors.images}</p>
            )}
            <button
              type="submit"
              className="font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 bg-[black] text-white shadow-md"
              disabled={disableSubmit}
            >
              Enviar
            </button>
          </div>
          <div className="">
          </div>
        </form>
      </div>
    </div >
  );
};

export default HousingForm;
