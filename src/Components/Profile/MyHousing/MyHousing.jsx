import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
export const MyHousing = (param) => {
    const {formHousing}=param
    const services = useSelector((state) => state.storage.AllService);
    console.log(services);
    const [formData, setFormData] = useState({
        title: "",
        provinces: "",
        cities: "",
        datesAvailable: "",
        datesEnd: "",
        price: "",
        accommodationType: "",
        services: [],
        square: "",
        images: [],
      });
    useEffect(()=>{
        setFormData({
            ...formData
            ,...formHousing})
    },[])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
          <div className="flex flex-col border-4 w-[500px] p-5 border-black space-y-4">
            <label htmlFor="title" className="text-sm">
              Title:
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </label>
      
            <label htmlFor="datesAvailable" className="text-sm">
              Dates Available:
              <input
                type="date"
                id="datesAvailable"
                name="datesAvailable"
                value={formData.datesAvailable}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </label>
      
            <label htmlFor="datesEnd" className="text-sm">
              Dates End:
              <input
                type="date"
                id="datesEnd"
                name="datesEnd"
                value={formData.datesEnd}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </label>
      
            <label htmlFor="type" className="text-sm">
              Type:
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </label>
      
            <label htmlFor="price" className="text-sm">
              Price:
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </label>
      
            <label htmlFor="location" className="text-sm">
              Location:
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </label>
      
            <label htmlFor="square" className="text-sm">
              Square:
              <input
                type="number"
                id="square"
                name="square"
                value={formData.square}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </label>
      
            <label htmlFor="availability" className="text-sm">
              Availability:
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </label>
      
            <label htmlFor="accommodationType" className="text-sm">
              Accommodation Type:
              <input
                type="text"
                id="accommodationType"
                name="accommodationType"
                value={formData.accommodationType}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
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
                          src={image}
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
      
            <label htmlFor="services" className="text-sm">
              Services:
             
                {services.map((service) => (
                  <label
                  key={service.id}
                  className="bg-white p-[5px] m-[3px] inline-flex items-center rounded-[20px] ml-4"
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
            </label>
      
            
          </div>
        </div>
      );
      
    
};
