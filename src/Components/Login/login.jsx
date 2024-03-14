import "../Login/login.css"
import { useState } from "react";
import 'boxicons'

const LoginPage = ()=>{


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if(!isLoggedIn) {
        setIsLoggedIn(true);
        }
    };

    console.log("isLogged:", isLoggedIn)

    return (
        <div className="container-login">
        <div className= {`container-form ${isLoggedIn? 'hide' : ''}`}>
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
        <div className= {`form-information-login ${isLoggedIn ? '' : 'hide'}`}>
            <h2>Hola de nuevo!</h2>
            <p>Nos alegra volver a verte, por favor inicia sesión:</p>
                <form className="form-login">
                    <label className="labelss">
                        <box-icon name='envelope'></box-icon>
                        <input className="inputt" placeholder="correo electrónico"></input>
                    </label>
                    <label className="labelss">
                        <box-icon name='lock-alt' ></box-icon>
                        <input className="inputt" placeholder="contraseña"></input>
                    </label>
                    <button className="register-button"> Iniciar </button>
                </form>
        </div>
        <div className="login-error">
            <label className='aviso'>Aviso
                <span className='close-error'>&times;</span>
            </label>
            <label className="icon-error">
                <box-icon name='error' size='100px'></box-icon>
            </label>
            <p>Usuario o contraseña incorrecto. Por favor, ingresalos nuevamente.</p>
            <button className= "back-button">Volver</button>
        </div>
        
    </div>
    
    )
// después validar número de teléfono e email!! 
}
export default LoginPage;
