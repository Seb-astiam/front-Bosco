import React from "react";

export const FormProfile = () => {
    return (
        <div>
            <div className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="province" className="text-sm">Nombre:</label>
                    <input type="text" id="province" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
            </div>
            <div className="flex flex-col border-4 w-[500px] p-5 border-black space-y-4">
                <div>
                    <label htmlFor="province" className="text-sm">Province:</label>
                    <input type="text" id="province" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="city" className="text-sm">City:</label>
                    <input type="text" id="city" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="address" className="text-sm">Address:</label>
                    <input type="text" id="address" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="phone" className="text-sm">Phone:</label>
                    <input type="text" id="phone" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="balance" className="text-sm">Balance:</label>
                    <input type="text" id="balance" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="housingProfile" className="text-sm">Housing Profile:</label>
                    <input type="text" id="housingProfile" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="petProfile" className="text-sm">Pet Profile:</label>
                    <input type="text" id="petProfile" className="border border-gray-300 rounded-md px-3 py-2 w-full" />
                </div>
            </div>
        </div>
    );
};
