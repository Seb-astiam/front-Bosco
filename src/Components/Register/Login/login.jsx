import "../Login/login.css"
import { useState } from "react";
import 'boxicons'
import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const LoginPage = ()=>{


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if(!isLoggedIn) {
        setIsLoggedIn(true);
        }
    };

    const [isWelcome, setIsWelcome] = useState(true);

    const handleIsWelcome = () => {
        if(isWelcome) {
            setIsWelcome(false)
        }
    }

    const [isNotUser, setIsNotUser] = useState(false);

    const handleIsNotUser = () => {
        if (isNotUser) {
            setIsNotUser(false);
        }
    }

    console.log("isNotUser:", isNotUser)

    //********************************************************************************

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log("email:", email)
    console.log("password:", password)

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
        <div className={`container-login ${isNotUser ? 'dark' : ''}`}>
            <div className={`container-form ${isLoggedIn ? 'hide' : ''}`}>
            <div className="h-[450px] rounded-bl-[15px] rounded-tl-[15px]">
                    {/* <img src={} alt="bosco" className="rounded-bl-[15px] rounded-tl-[15px]" /> */}
                </div>
            <div className="information">
                <div className="info-childs">
                    <h2>Bienvenido</h2>
                    <p>Para poder unirte a nuestra comunidad por favor inicia sesión con tus datos. </p>
                    <button className="buttonSignIn" onClick= {handleLogin} >Inicia Sesión</button>
                    <p> Si no tienes una cuenta, <a href="/register" className="text-blue-500 hover:underline">regístrate aquí</a>
                    </p>
                </div>
            </div> 
        </div>
        <div className= {`form-information-login ${isLoggedIn ? '' : 'hide'}}
        `}>
            <h2>Hola de nuevo!</h2>
            <p>Nos alegra volver a verte, por favor inicia sesión:</p>
                <form className="form-login" onSubmit={ handleSubmit}>
                    <div className="email-login-container">
                    <label className="labelss">
                        <box-icon name='envelope'></box-icon>
                        <input className="inputt" placeholder="correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </label>
                    </div>
                    
                    <div className="password-login-container">
                    <label className="labelss">
                        <box-icon name='lock-alt' ></box-icon>
                        <input className="inputt" 
                        placeholder="contraseña" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        type={ showPassword ? 'text' : 'password'} 
                        >      
                        </input>
                    </label>
                    <Box-icon name={showPassword ? 'show' : 'low-vision'} onClick={handlePasswordVisibility} size= '30px'/>
                    </div>
                    <p> No tienes una cuenta? <a href="/register" className="text-blue-500 hover:underline">regístrate aquí</a></p>
                    <button className="register-button" disabled={!isFormValid}> Iniciar </button>
                </form>
        </div>
        <div className= {`login-error ${!isNotUser? 'hide' : ''}`}>
            <label className='aviso'>Aviso
                <span className='close-error'>&times;</span>
            </label>
            <label className="icon-error">
                <box-icon name='error' size='80px'></box-icon>
            </label>
            <p>Usuario o contraseña incorrecto. Por favor, ingresalos nuevamente.</p>
            <button className= "back-button" onClick={handleIsNotUser}>Volver</button>
        </div>
    </div>
    
    )
// después validar número de teléfono e email!! 
}
export default LoginPage;











