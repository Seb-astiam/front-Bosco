import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PagoRechazado= () => {
    const [showMessage, setShowMessage] = useState(true);
    const [redirectCount, setRedirectCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setRedirectCount((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (redirectCount === 0) {
            navigate("/");
        }
    }, [redirectCount, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 to-blue-200 flex flex-col items-center justify-center px-4 gap-2">
            {showMessage && (
                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-bold text-gray-800">
                        Pago rechazado, por favor intenta nuevamente
                    </h2>
                </div>
            )}
            <div className="bg-white p-4 rounded-md shadow-md">
                <p className="text-gray-800">
                    Serás redirigido a la página de inicio en {redirectCount} segundos.
                </p>
            </div>
        </div>
    );
};

export default PagoRechazado;