import "../Login/login.css"
import { useState } from "react";
import 'boxicons'
import React from "react";
import axios from 'axios'

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

    const [isUser, setIsUser] = useState(false);

    const handleIsUser = () => {
        if (!isUser) {
            setIsUser(true);
        }
    }

    console.log("isUser:", isUser)
    console.log("isLogged:", isLoggedIn)


    //********************************************************************************

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleVerification = async() => {
        try {
            const response = await axios.get('http://localhost:3001/user')
            const users = response.data

            const emailExist = users.find(user => user.email === email)


            if (emailExist) {
                if (emailExist.password === password){
                    // por favar agregar algo más para avisar que es exitoso y redirigir!
                    window.alert("inicio exitoso");
                    console.log("inicio exitoso")
                } else {
                    // acá va el aviso!
                    console.log("contreña incorrecta")
                    window.alert("contraseña incorrecta");
                }
            } else {
                // pondremos el mismo aviso o cambiamos la leyenda?
                console.log("email no encontrado")
                window.alert("email incorrecto");
            }
        } catch (error) {
            console.error('Error al obtener datos del servidor:', error);
            
        }

    
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe
        await handleVerification(); // Verificar credenciales antes de redirigir
      };

    return (
        <div className="container-login">
        <div className= {`container-form ${isLoggedIn? 'hide' : ''} && ${isUser? 'hide': ''}`}>
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
        <div className= {`form-information-login ${isLoggedIn ? '' : 'hide'} && ${isUser? 'hide': ''}`}>
            <h2>Hola de nuevo!</h2>
            <p>Nos alegra volver a verte, por favor inicia sesión:</p>
                <form className="form-login" onSubmit={ handleSubmit}>
                    <label className="labelss">
                        <box-icon name='envelope'></box-icon>
                        <input className="inputt" placeholder="correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </label>
                    <label className="labelss">
                        <box-icon name='lock-alt' ></box-icon>
                        <input className="inputt" placeholder="contraseña" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                    <button className="register-button" > Iniciar </button>
                </form>
        </div>
        <div className= {`login-error ${!isUser? 'hide' : ''}`}>
            <label className='aviso'>Aviso
                <span className='close-error'>&times;</span>
            </label>
            <label className="icon-error">
                <box-icon name='error' size='80px'></box-icon>
            </label>
            <p>Usuario o contraseña incorrecto. Por favor, ingresalos nuevamente.</p>
            <button className= "back-button">Volver</button>
        </div>
    </div>
    
    )
// después validar número de teléfono e email!! 
}
export default LoginPage;
