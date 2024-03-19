import { useState } from "react";
import 'boxicons'
import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import bosco from "../../../assets/bosco-logo.jpeg"

const LoginPage = ()=>{


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if(!isLoggedIn) {
        setIsLoggedIn(true);
        }
    };

    const [isNotUser, setIsNotUser] = useState(false);

    const handleIsNotUser = () => {
        if (isNotUser) {
            setIsNotUser(false);
        }
    }

    //********************************************************************************

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleVerification = async() => {
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password })
            const verification = response.data

            if (response.status === 200) {
                    // por favar agregar algo más para avisar que es exitoso y redirigir!
                    navigate("/principal")
                    // window.alert("inicio de sesión exitoso");
                    
                } else {
                    // En caso de otros códigos de estado, mostrar un mensaje de error genérico
                    window.alert("Inicio de sesión fallido: Error en la solicitud");
                    
                }
            
        } catch (error) {

            if (error.response && error.response.status === 400) {
                // El servidor respondió con un código de estado 400 (Bad Request)
                setIsNotUser(true)
                const verification = error.response.data;
                //window.alert("Usuario o contraseña incorrecto, intentelo nuevamente por favor.");
                
            } if (error.response && error.response.status === 500) {
                setIsNotUser(true)
                const verification = error.response.data;
                //window.alert("Usuario o contraseña incorrecto, intentelo nuevamente por favor.");
                
            }
            
        }
    }

    /****************************** */

    const isEmailValid = /^\S+@\S+\.\S+$/.test(email); // Verifica el formato de email
    const isPasswordValid = password.length >= 8; // Verifica la longitud de la contraseña

    const isFormValid = email && password && isEmailValid && isPasswordValid;


    /********************************* */

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe
        await handleVerification(); // Verificar credenciales antes de redirigir
      };

      /************************************************************ */

        const [showPassword, setShowPassword] = useState(false);
      
        const handlePasswordVisibility = () => {
          setShowPassword(!showPassword);
        };
       
       /******************************************** */ 
       const navigate = useNavigate();

    return (
        <div className=" w-screen h-screen flex justify-center items-center absolute" >
                 <div className={` ${isLoggedIn ? '-translate-y-[300%]' : ''} h-[90%] w-[80%] flex  absolute`} >
                    <div className="h-[100%] w-[50%] rounded-bl-[20px] rounded-tl-[20px]">
                        <img src={bosco} alt="bosco" className="rounded-bl-[20px] rounded-tl-[20px] w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col items-center px-[5%] justify-center rounded-br-[20px] rounded-tr-[20px] h-[100%] w-[50%] !bg-[#FEB156] max-w-[400px]" >
                        <h2 className='font-custom font-extrabold'>Bienvenido</h2>
                        <p className="font-custom font-semibold text-center">Para poder unirte a nuestra comunidad por favor inicia sesión con tus datos. </p>
                        <button className="font-bold font-custom outline-none rounded-2xl m-2 px-5 py-3 bg-[black] text-white cursor-pointer transition duration-300 ease-in-out hover:bg-[transparent] hover:text-black hover:shadow-md" onClick={handleLogin} >Inicia Sesión</button>
                        <p className="font-custom"> Si no tienes una cuenta, <a href="/register" className="text-blue-500 hover:underline">regístrate aquí</a>
                        </p>
                    </div>
                </div>
                <div className= {` ${isLoggedIn ? '' : '-translate-y-[300%]'} flex absolute h-[90%] w-[80%] `} >
                    <div className="h-[100%] w-[50%] rounded-bl-[20px] rounded-tl-[20px]">
                        <img src={bosco} alt="bosco" className="rounded-bl-[20px] rounded-tl-[20px] w-full h-full object-cover" />
                    </div>
            
                    <form className="flex flex-col items-center px-[5%] justify-center rounded-br-[20px] rounded-tr-[20px] h-[100%] w-[50%] !bg-[#FEB156] max-w-[400px]" onSubmit={ handleSubmit}>
                        <h2 className="font-custom font-extrabold my-0">Hola de nuevo!</h2>
                        <p className="font-custom font-semibold text-center">Nos alegra volver a verte, por favor inicia sesión:</p>
                        <div className="mb-[20px]">
                            <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
                                <box-icon name='envelope'></box-icon>
                                <input className="w-[225px] outline-none" placeholder="  correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </label>
                        </div>
                        <div className="items-center  flex flex-row ml-[25px] mb-[20px]">
                            <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
                                <box-icon name='lock-alt' ></box-icon>
                                <input className="w-[225px] outline-none"
                                placeholder="  contraseña" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                type={ showPassword ? 'text' : 'password'} 
                                >      
                                </input>
                            </label>
                        <Box-icon name={showPassword ? 'show' : 'low-vision'} onClick={handlePasswordVisibility} />
                        </div>
                            <p className="font-custom font-semibold text-center text-sm"> No tienes una cuenta? <a href="/register" className="text-blue-500 hover:underline">regístrate aquí</a></p>
                            <button 
                            className={`font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 ${isFormValid ? 'bg-[black] text-white shadow-md' : 'bg-[transparent] text-black shadow-md'}`}
                            disabled={!isFormValid}
                            > Iniciar </button>
                    </form> 
                </div>
                <div className={`${isNotUser? 'bg-[rgba(0,_0,_0,_0.5)] ' : '-translate-y-[500%]'} w-screen h-screen flex justify-center items-center absolute`}>
                    < div className= {`${isNotUser ? '' : '-translate-y-[500%]' }  flex flex-col items-center rounded-[20px] absolute h-[450px] w-[400px] text-xl bg-[#eee] max-w-[400px]`}>
            
                    <label className='bg-[#d14d12] w-[340px] h-[60px] px-[30px] rounded-tr-[20px] rounded-tl-[20px] font-custom font-extrabold flex justify-between items-center'>Aviso
                        <span className= "cursor-pointer" onClick={handleIsNotUser}>&times;</span>
                    </label>
                    <label className=" flex justify-center py-[30px]">
                        <box-icon name='error' size='100px'></box-icon>
                    </label>
                    <p className="font-custom font-semibold text-center mx-10" >Usuario o contraseña incorrecto. Por favor, ingresalos nuevamente.</p>
                    <button  className="font-bold font-custom outline-none w-[125px] rounded-2xl py-[15px] my-[30px] bg-[black] text-white cursor-pointer transition duration-300 ease-in-out hover:bg-[transparent] hover:text-black hover:shadow-md" onClick={handleIsNotUser}>Volver</button>
                    </div>
                </div>
        </div>
    
    )
// después validar número de teléfono e email!! 
}
export default LoginPage;











