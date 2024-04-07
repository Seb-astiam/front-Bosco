import { useEffect, useState } from "react";
import 'boxicons'
import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import bosco from "../../../assets/bosco-logo.jpeg"
import { useGoogleLogin } from "@react-oauth/google";


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
            const response = await axios.post('http://localhost:3001/auth/login', { email, password })

            if (response.status === 200) {
                 // Guardar la respuesta en el localStorage
                    localStorage.setItem("user", JSON.stringify(response.data));
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
                // setIsNotUser(true)
                window.alert(error.response.data); 

                //window.alert("Usuario o contraseña incorrecto, intentelo nuevamente por favor.");
                
            } if (error.response && error.response.status === 500) {
                setIsNotUser(true)
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
       const [haveAccount, setHaveAccount] = useState(true)
       const handleHaveAccount = ()=>{ 
        if (!haveAccount) {
            setHaveAccount(true)
        } else {
            setHaveAccount(false)
        }
       }

       const [accessToken, setAccessToken] = useState([]);
       // guarda entre otras cosas que no sirven, una propiedad access_token 
       // que sirve para acceder a los datos del usuario
       
       const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setAccessToken(codeResponse);
        },
        onError: (error) => console.log("Login Failed:", error)
    });
    useEffect(() => {
        const fetchData = async () => {
            // Verifica si accessToken está definido y no es un arreglo vacío
            if (accessToken && accessToken.access_token) {
                try {
                    const token = accessToken.access_token;
                    
                    // Realiza la solicitud al servidor para registrar al usuario
                    const userResponse = await axios.post("http://localhost:3001/auth/google-login", { token }
                    );
    
                    // Obtén los datos del usuario registrado
                    const userData = userResponse.data;
    
                    // Guarda la información del usuario en el localStorage
                    localStorage.setItem("user", JSON.stringify(userData));
    
                    // Redirige al usuario a la página principal
                    navigate('/principal');
                    
                } catch (error) {
                    // Maneja cualquier error que ocurra durante la solicitud
                    if (error.response && error.response.status === 400) {
                        setHaveAccount(false);
                    } else {
                        console.error("Error during registration:", error);
                    }
                }
            }
        };
    
        // Llama a fetchData solo cuando accessToken cambie y esté definido
        if (accessToken && accessToken.access_token) {
            fetchData();
        }
    }, [accessToken]);
    

    //******************************************************* */

    const appId = import.meta.env.VITE_APP_ID

    const [tokenFB, setTokenFB] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        // Inicializar el SDK de Facebook
        window.fbAsyncInit = function() {
            window.FB.init({
                appId            : appId,
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v13.0'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/es_ES/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    const handleFacebookLogin = () => {
        window.FB.login((response) => {
            if (response.status === 'connected') {
                setTokenFB(response.authResponse.accessToken);
                setUserId(response.authResponse.userID)
            } else {
                console.log("Inicio de sesión de Facebook fallido");
            }
        }, { scope: 'public_profile,email' });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (tokenFB) {
                try {
                    const token = tokenFB
                    console.log("tokenFB", token);
                    console.log("userIDFB", userId)
                    
                    if (token) {
                        const userResponse = await axios.post(
                            "http://localhost:3001/auth/facebook-login",
                            { token, userId },
                            {
                                headers: {
                                    Authorization: `Bearer ${tokenFB}`,
                                    Accept: "application/json",
                                },
                            }
                        );
    
                        const userData = userResponse.data;
    
                        // Guardar la información del usuario en el localStorage
                        localStorage.setItem("user", JSON.stringify(userData));
    
                        navigate('/principal');
                    } else {
                        console.log("Inicio de sesión fallido");
                    }
                } catch (error) {
                    console.error("Error durante la solicitud:", error);
                    setHaveAccount(false);
                }
            }
        };
    
        if (tokenFB) {
            fetchData();
        }
    }, [tokenFB]);

    /**************************************** */

    const [adviceRecover, setAdviceRecover] = useState(false)
    const [emailRecover, setEmailRecover] = useState()
    const [emailNotFound, setEmailNotFound] = useState(false)
    const handleAdviceRecover = ()=>{
        if(adviceRecover) {
        setAdviceRecover(false)
        } else {
            setAdviceRecover(true)
            setEmailNotFound(false)
            setEmailRecover("")
        }
    }

    const recoverPassword = async()=>{
       
        try {
         const response = await axios.post(`http://localhost:3001/auth/password-reset/${emailRecover}`)
            handleAdviceRecover();
        } catch (error) {
            setEmailNotFound(true)
    }
    }

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
                        <p className="font-custom"> Si no tienes una cuenta, <a href="/register" className="text-blue-900 hover:underline">regístrate aquí</a>
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
                            <div className="flex flex-row  items-center">
                            <div className='rounded-[50%] p-[15px] flex items-center justify-center cursor-pointer mx-[10px] transition duration-300 ease-in-out shadow-md hover:bg-[#333] hover:text-[white]'>
                                <box-icon size='30px' type='logo' name='google' onClick={login}></box-icon>
                            </div> 
                            <div className='rounded-[50%] p-[15px] flex items-center justify-center cursor-pointer mx-[10px] transition duration-300 ease-in-out shadow-md hover:bg-[#333] hover:text-[white]'>
                                <box-icon size='30px' type='logo' name='facebook' onClick={handleFacebookLogin} ></box-icon>
                            </div> 
                            </div>
                            <p className="font-custom">- o -</p>
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
                            <p className="font-custom font-semibold text-center text-sm"> No tienes una cuenta? <a href="/register" className="text-blue-900 cursor-pointer">Regístrate aquí</a></p>
                            <p className='font-custom font-semibold text-center text-sm'>Olvidaste tu contraseña? <a onClick={handleAdviceRecover} className="text-blue-900 underline cursor-pointer">Recuperar</a> </p>
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
                <div className={`${haveAccount? '-translate-y-[500%]' : 'bg-[rgba(0,_0,_0,_0.5)] '} w-screen h-screen flex justify-center items-center absolute`}>
                    < div className= {`${haveAccount ? '-translate-y-[500%]' : '' }  flex flex-col items-center rounded-[20px] absolute h-[450px] w-[400px] text-xl bg-[#eee] max-w-[400px]`}>
            
                    <label className='bg-[#d14d12] w-[340px] h-[60px] px-[30px] rounded-tr-[20px] rounded-tl-[20px] font-custom font-extrabold flex justify-between items-center'>Aviso
                        <span className= "cursor-pointer" onClick={handleHaveAccount}>&times;</span>
                    </label>
                    <label className=" flex justify-center py-[30px]">
                        <box-icon name='error' size='100px'></box-icon>
                    </label>
                    <p className="font-custom font-semibold text-center mx-10" >Cuenta no registrada, por favor registrese o intente con otra cuenta.</p>
                    <a className="font-bold font-custom outline-none text-center w-[200px] rounded-2xl py-[15px] my-[30px] bg-[black] text-white cursor-pointer transition duration-300 ease-in-out hover:bg-[transparent] hover:text-black hover:shadow-md" href="/register"  style={{ textDecoration: 'none' }} >Registrarme</a>
                    </div>
                </div>
                <div className={`${!adviceRecover? '-translate-y-[500%]' : 'bg-[rgba(0,_0,_0,_0.5)] '} w-screen h-screen flex justify-center items-center absolute`}>
                    < div className= {`${!adviceRecover ? '-translate-y-[500%]' : '' }  flex flex-col items-center rounded-[20px] absolute h-[450px] w-[400px] text-xl bg-[#eee] max-w-[400px]`}>
            
                    <label className='bg-[#d14d12] w-[340px] h-[60px] px-[30px] rounded-tr-[20px] rounded-tl-[20px] font-custom font-extrabold flex justify-between items-center'>Recuperar contraseña
                        <span className= "cursor-pointer" onClick={handleAdviceRecover}>&times;</span>
                    </label>
                    <label className=" flex justify-center py-[20px]">
                        <box-icon name='mail-send' size='100px'></box-icon>
                    </label>
                    <p className="font-custom font-semibold text-center mx-10" >Enviaremos un mail a tu correo con una nueva contraseña</p>
                    <input className="shadow rounded-[20px] px-5 py-3 " placeholder='Correo de recuperación' value={emailRecover} onChange={(e) => setEmailRecover(e.target.value)}></input>  
                    <p className={`${emailNotFound? '' : '-translate-y-[1000000%]'} font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727] m-1`} > *Email no registrado</p>
                    <a className={`font-bold font-custom outline-none text-center px-[30px] rounded-[20px] py-[15px] my-[10px] bg-[black] text-white cursor-pointer transition duration-300 ease-in-out hover:bg-[transparent] hover:text-black hover:shadow-md  ${emailRecover ? 'bg-[black] text-white shadow-md' : 'bg-[transparent] text-black shadow-md'}`} onClick={recoverPassword} disabled={!emailRecover}>Enviar</a>
                    </div>
                </div>
        </div>
    
    )
// después validar número de teléfono e email!! 
}
export default LoginPage;
