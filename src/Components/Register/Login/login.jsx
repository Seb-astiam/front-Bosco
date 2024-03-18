import "./login.css"
import { useState } from "react";
import bosco from "../../../../public/bosco.jpeg"

const LoginPage = ()=>{


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if(!isLoggedIn) {
        setIsLoggedIn(true);
        }
    };

    return (
        <div className="container-login">

            <div className= {`flex ${isLoggedIn? 'hide' : ''}`}>

                <div className="h-[450px] rounded-bl-[15px] rounded-tl-[15px]">
                    <img src={bosco} alt="bosco" className="rounded-bl-[15px] rounded-tl-[15px]" />
                </div>

                <div className="flex flex-col p-[70px] items-center justify-center bg-naranjaForm w-[350px] rounded-br-[15px] rounded-tr-[15px] h-[454px]">
                    <h2 className="font-custom font-extrabold">Bienvenido</h2>
                    <p className="font-custom font-semibold">Para poder unirte a nuestra comunidad por favor inicia sesión con tus datos. </p>
                    <button className="font-bold font-custom bg-black outline-none  rounded-2xl m-2 px-5 py-3 text-white cursor-pointer transition duration-300 ease-in-out hover:bg-transparent hover:text-black hover:shadow-md" onClick= {handleLogin} >Inicia Sesión</button>
                    <p className="font-custom"> Si no tienes una cuenta, <a href="/register" className="text-blue-500 hover:underline font-custom">regístrate aquí</a>
                    </p>
                </div> 
            </div>

            <div className= {`form-information-login ${isLoggedIn ? '' : 'hide'}`}>
                <h2>Hola de nuevo!</h2>
                <p>Nos alegra volver a verte, por favor inicia sesión:</p>
                <form className="form-login">

                    <label className="labelss">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUlJREFUSEvd1T8ohWEUx/GPJIPBZJBSMmCwW2xGpbBSNmVSBhbJRCmTsilWfxaZbBYzA5OQMpgMBsmfe/S8um73ute93eWe5an3vM/5nt/vvM/zNqlzNNW5vsYCjGEN/TXadoUFnESdfIse0FVj8Wz7DXoLAZ8pO4DrKkGhPhT81M5XkAFeMI3Df0LGsYu2coCs7gYW8V4G1JxmF77nx3fzxRTMYButOMMEnkpAOnCAYbxiFjvlFAR0EMfoxiNC/nkBZCjZ2Il7jOaauURmdUkFmap27GMEb5jHVoLMYRMtOMVkLv+cchUDMgtXsJw276V1Kq2RW83rOh7/C5C5EipCTaiKiG6j6+i+MKoCRJEeHOXUfKSZ3JYYfNWASo9FAwPu0ndfqRV/vRfziZn9OslxXa+jr0bCRe5ULxW7rmusW3x7Y/0y62LRF2qEQhkl8rgIAAAAAElFTkSuQmCC"/>
                        <input className="inputt" placeholder="correo electrónico" name=""></input>
                    </label>

                    <label className="labelss">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPtJREFUSEvt1TFKA0EYxfFfvEKwEEEIFqb1Cjams5HcQbASG7FRTKFYWMU7WNkFEvAKFjZ2oiBW4g2CGphAXHbzZVeCFplqmG/m/Wceb2Zq5txqc9Y3K2AXe9hKG7pDF7fRBmcBXOKwQOgEp9MgEaCNmyRwhuvU38dx6m9jUASJAPfYxAGuMiIjQAd9tKoChlj69nsZ7xmRFbzhA/WqgM+0sOikUT1MUSQQ1f8GsINzNKOMZ+qPKc69yfE8b1+xWlJ8PP0J6xEg9LUAnrsu7wQLwA9XFhZNBur/pOgFaxUv2jMa0UUbPRUX2CgJecARwqeipO706dGP9mvYFyImMRnCUhKsAAAAAElFTkSuQmCC"/>
                        <input className="inputt" placeholder="contraseña"></input>
                    </label>

                    <button className="register-button"> Iniciar </button>
                </form>
            </div>
        </div>
    
    )
// después validar número de teléfono e email!! 
}
export default LoginPage;
