import React from "react";
import { useState } from "react";

export const MyHousing = () => {
    const [formData, setFormData] = useState({
        title: "",
        datesAvailable: "",
        datesEnd: "",
        type: "",
        price: "",
        location: "",
        square: "",
        availability: "",
        images: "",
        accommodationType: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <div className="flex flex-col border-4 w-[500px] p-5 border-black space-y-4">
                <div>
                    <label htmlFor="title" className="text-sm">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="datesAvailable" className="text-sm">Dates Available:</label>
                    <input type="date" id="datesAvailable" name="datesAvailable" value={formData.datesAvailable} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="datesEnd" className="text-sm">Dates End:</label>
                    <input type="date" id="datesEnd" name="datesEnd" value={formData.datesEnd} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="type" className="text-sm">Type:</label>
                    <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="price" className="text-sm">Price:</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="location" className="text-sm">Location:</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="square" className="text-sm">Square:</label>
                    <input type="number" id="square" name="square" value={formData.square} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="availability" className="text-sm">Availability:</label>
                    <select id="availability" name="availability" value={formData.availability} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full">
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="images" className="text-sm">Images:</label>
                    <input type="text" id="images" name="images" value={formData.images} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="accommodationType" className="text-sm">Accommodation Type:</label>
                    <input type="text" id="accommodationType" name="accommodationType" value={formData.accommodationType} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
            </div>
        </div>
    );
};
