import 'boxicons'
import React, { useEffect, useState } from "react";
import { isValidUsername } from "../../Validations/validUserName";
import { isValidEmail } from "../../Validations/validEmail";
import { isValidPassword } from "../../Validations/validPassword";
import { isValidPasswordConfirmation } from "../../Validations/validPasswordConfirmation";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import bosco from "../../../assets/bosco-logo.jpeg"
import { useGoogleLogin } from "@react-oauth/google";


export const Register = () => {

    const navigate = useNavigate();

        const [input, setInput] = useState({
            name: "",
	        email: "", 
	        password: "", 
            passwordConfirmation: ""

        });

        const [inputError, setInputError] = useState({

            name: { valid: false, error: '' },
            email: { valid: false, error: '' },
            password: { valid: false, error: '' },
            passwordConfirmation: { valid: false, error: '' }
        
        });

    const handleChange = async(e) => {
  
        const { name, value } = e.target;

            if (name === 'name') {
                const { valid, error } = isValidUsername(value);
                setInputError(inputError => ({
                    ...inputError, name: { valid, error }
                }));
                setInput(prevInput => ({
                    ...prevInput, [name]: value
                }));
            }

          if (name === 'email') {
            const { valid, error } = await isValidEmail(value);
            setInputError(inputError => ({
                ...inputError, email: { valid, error }
            }));
            setInput(prevInput => ({
                ...prevInput, [name]: value
            }));
        }
        
    
          if (name === 'password') {
            const { valid, error } = isValidPassword(value);
            setInputError(inputError => ({
                ...inputError, password: { valid, error }
            }));
            setInput(prevInput => ({
                ...prevInput, [name]: value
            }));
        }

        if (name === 'passwordConfirmation') {
            const { valid, error } = isValidPasswordConfirmation(input.password, value);
            setInputError(inputError => ({
                ...inputError, passwordConfirmation: { valid, error }
            }));
            setInput(prevInput => ({
                ...prevInput, [name]: value
            }));
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handlePasswordConfirmationVisibility = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    }

    const [termsChecked, setTermsChecked] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const isValid = Object.values(inputError).every(field => field.valid) && termsChecked;
        setFormValid(isValid);
    }, [inputError, termsChecked]);


    const handleCheckboxChange = () => {
        setTermsChecked(!termsChecked);
    }
    
    const [verificationSuccessful, setVerificationSuccessful]= useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Object.values(inputError).every(field => field.valid);
      
        if (!isValid) {
          window.alert('Por favor, complete todos los campos correctamente antes de enviar.');
          return;
        }
      
        try {
          const responseBack = await axios.post("/user", input, {
            headers: {
              'Content-Type': 'application/json',
            },
      
          });

          setVerificationSuccessful(true)
          const userData = responseBack.data;

          localStorage.setItem("user", JSON.stringify(userData));

          
        } catch (error) {
          window.alert('Error al crear usuario')
        }
      };

      const handleClose = () => {
        navigate('/');
      };

      const handleCloseRegister = () => {
        if(setIsAccountPrevRegister) {
        setIsAccountPrevRegister(false) 
        } else {
            setIsAccountPrevRegister(true)
        }
      }

    const [accessToken, setAcessToken] = useState([]);

    const [isAccountPrevRegister, setIsAccountPrevRegister] = useState(false)
    
    const register = useGoogleLogin({
        onSuccess: (codeResponse) => {setAcessToken(codeResponse)
        },
        onError: (error) => console.log("Login Failed:", error)
    });


  useEffect(() => {
    const fetchData = async () => {

        if (accessToken && accessToken.access_token) {
            try {
                const token = accessToken.access_token;
                
                // Realiza la solicitud al servidor para registrar al usuario
                const userResponse = await axios.post("/auth/google-register", { token }
                );

                const userData = userResponse.data;

                localStorage.setItem("user", JSON.stringify(userData));

                navigate('/principal');
                
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setIsAccountPrevRegister(true);
                } else {
                    window.alert("Error during registration:", error);
                }
            }
        }
    };

    if (accessToken && accessToken.access_token) {
        fetchData();
    }
}, [accessToken]);

const appId = import.meta.env.VITE_APP_ID

    const [tokenFB, setTokenFB] = useState(null)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
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

    const handleFacebookRegister = () => {
        window.FB.login((response) => {
            if (response.status === 'connected') {
                setTokenFB(response.authResponse.accessToken);
                setUserId(response.authResponse.userID)
                console.log("me hicieron click")
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
                    if (token) {
                        const userResponse = await axios.post(
                            "/auth/facebook-register",
                            { token, userId },
                            {
                                headers: {
                                    Authorization: `Bearer ${tokenFB}`,
                                    Accept: "application/json",
                                },
                            }
                        );
    
                        const userData = userResponse.data;
    
                        localStorage.setItem("user", JSON.stringify(userData));
    
                        navigate('/principal');
                    } else {
                        console.log("Inicio de sesión fallido");
                    }
                } catch (error) {
                    console.error("Error durante la solicitud:", error);
                    setIsAccountPrevRegister(true);
                }
            }
        };
    
        if (tokenFB) {
            fetchData();
        }
    }, [tokenFB]);


    return (

        <div className=" w-screen h-screen flex justify-center items-center ">
            <div className={`${verificationSuccessful? '' : ''} h-[90%] w-[80%] flex justify-center items-center mq900:flex-col mq900:w-[100%]`}>

                <div className="h-[100%] w-[50%] rounded-bl-[20px] rounded-tl-[20px] max-w-[400px] mq900:rounded-bl-[0px] mq900:rounded-tr-[20px] mq900:h-[200px] mq900:w-[95%] mq900:max-w-[95%] mq900:mt-[20px]">
                    <img src={bosco} alt="bosco" className="rounded-bl-[20px] rounded-tl-[20px] w-full h-full object-cover mq900:rounded-bl-[0px] mq900:rounded-tr-[20px] mq900:h-[200px] mq900:w-[100%] mq900:max-w-[100%]" />
                </div>

                <div className="flex flex-col items-center px-[5%] mq900:px-0 justify-center rounded-br-[20px] rounded-tr-[20px] h-[100%] w-[50%] !bg-[#FEB156] max-w-[400px] mq900:w-[95%] mq900:max-w-[95%] mq900:rounded-tr-[0px] mq900:rounded-bl-[20px] mq900:mb-[20px]">
                    <h2 className='font-custom font-extrabold ' >Crear una cuenta</h2>
                        <div className="flex flex-col  items-center">
                            <div className='flex'>
                        <div className='rounded-[50%] p-[15px] flex items-center justify-center cursor-pointer mx-[10px] transition duration-300 ease-in-out shadow-md hover:bg-[#333] hover:text-[white]'>
                            <box-icon size='30px' type='logo' name='google' onClick={register}></box-icon>
                            </div> 
                            <div className='rounded-[50%] p-[15px] flex items-center justify-center cursor-pointer mx-[10px] transition duration-300 ease-in-out shadow-md hover:bg-[#333] hover:text-[white]'>
                            <box-icon size='30px' type='logo' name='facebook' onClick={handleFacebookRegister}></box-icon>
                            </div>
                            </div>
                            <p className="font-custom">o usa tu email para registrarte</p>
                        </div>

                    <form className="flex flex-col items-center my-[0%] px-[5%] justify-center rounded-br-[20px] rounded-tr-[20px] w-[100%]" onSubmit={handleSubmit}>
                        <div className="">
                            <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
                                <box-icon name='user' ></box-icon>
                                <input className= "w-[225px] outline-none" name= "name" value={input.name}  onChange={handleChange} placeholder="usuario"></input> 
                            </label>
                        </div>

                        <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">{inputError.name.error}</p>
                            <div className="">
                                <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
                                    <box-icon name='envelope'></box-icon>
                                    <input className= "w-[225px] outline-none" name= "email" value={input.email}  onChange={handleChange} placeholder="correo electrónico"></input>
                                </label>
                            </div>

                            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">{inputError.email.error}</p>

                            <div className=" items-center  flex flex-row ml-[25px]">
                                <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
                                    <box-icon name='lock-alt' ></box-icon>
                                    <input 
                                    className= "w-[225px] outline-none"
                                    name= "password"  
                                    value={input.password}
                                    onChange={handleChange} 
                                    placeholder="contraseña"
                                    type={showPassword ? 'text' : 'password'}
                                    >
                                    </input>
                                </label>
                                <Box-icon name={showPassword ? 'show' : 'low-vision'} onClick={handlePasswordVisibility} size= '30px'/>
                            </div>

                            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">{inputError.password.error}</p>

                            <div className=" items-center  flex flex-row ml-[25px]">
                                <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
                                    <box-icon name='lock-alt' ></box-icon>
                                    <input 
                                    className= "w-[225px] outline-none"
                                    name = "passwordConfirmation" 
                                    value={input.passwordConfirmation}  
                                    onChange={handleChange} 
                                    placeholder="repetir contraseña"
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    >
                                    </input>
                                </label>
                                <Box-icon name={showPassword ? 'show' : 'low-vision'} onClick={handlePasswordConfirmationVisibility} size= '30px' />
                            </div>

                            <p className="font-custom font-semibold w-[100%] text-center text-[12px] text-[#852727]">{inputError.passwordConfirmation.error}</p>

                            <label className="flex">
                                <input className="" type="checkbox" checked= {termsChecked} onChange={handleCheckboxChange}/>
                                <p className= "font-custom text-[12px] my-[0px]"> Acepto los <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Términos y condiciones</a> y autorizo el uso de mis datos de acuerdo a la <a href="/declaration"  target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Declaración de Privacidad.</a>
                                </p>
                            </label>

                            <label className="flex">
                                <input className="check-input" type="checkbox"  />
                                <p className= "font-custom text-[12px] my-[0px]">Quiero recibir notificaciones</p>
                            </label>
                        <button 
                            className={`font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 ${formValid ? 
                            'bg-[black] text-white shadow-md' : 'bg-[transparent] text-black shadow-md'}`} disabled={!formValid}>
                            Registrarme 
                        </button>

                    </form>
                </div>
            </div>

            <div className={`${verificationSuccessful? 'bg-[rgba(0,_0,_0,_0.5)] ' : '-translate-y-[500%]'} w-screen h-screen flex justify-center items-center absolute`}>
                <div className= {`${verificationSuccessful? '' : '-translate-y-[500%]'} flex flex-col items-center rounded-[20px] absolute h-[450px] w-[400px] text-xl bg-[#eee] max-w-[450px] mq900:w-[95%] mq900:max-w-[95%]`}>
                    <label className='bg-[#d14d12] w-[340px] h-[60px] px-[30px] rounded-tr-[20px] rounded-tl-[20px] font-custom font-extrabold flex justify-between items-center mq900:w-[95%] mq900:px-[2.5%]'>
                        Verificá tu email
                        <span className= "cursor-pointer" onClick={handleClose}>&times;</span>
                    </label>
                    <label className="flex justify-center py-[15px]">
                        <box-icon name='check-shield' size='80px'></box-icon>
                    </label>
                    <h2 className="font-custom font-extrabold my-0">Hola {input.name}! </h2>
                    <p className='font-custom font-semibold text-center mx-10 text-[15px]'>
                    Confirmanos si esta realmente es tu dirección de email para ayudarnos a mantener tu cuenta segura. Este email tiene una caducidad de 24hs, fué enviado a: </p>
                    <h3 className="font-custom font-extrabold my-0"> {input.email} </h3>
                    <a className="font-bold font-custom outline-none text-center w-[200px] rounded-2xl py-[15px] my-[30px] bg-[black] text-white cursor-pointer transition duration-300 ease-in-out hover:bg-[transparent] hover:text-black hover:shadow-md" href="https://mail.google.com/mail/u/0" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} >Confirmá tu email</a>
                </div>
            </div>

            <div className={`${isAccountPrevRegister? 'bg-[rgba(0,_0,_0,_0.5)] ' : '-translate-y-[500%]'} w-screen h-screen flex justify-center items-center absolute`}>
                <div className= {`${isAccountPrevRegister? '' : '-translate-y-[500%]'} flex flex-col items-center rounded-[20px] absolute h-[450px] w-[400px] text-xl bg-[#eee] max-w-[450px]  mq900:w-[95%] mq900:max-w-[95%]`}>
                    <label className='bg-[#d14d12] w-[340px] h-[60px] px-[30px] rounded-tr-[20px] rounded-tl-[20px] font-custom font-extrabold flex justify-between items-center mq900:w-[95%] mq900:px-[2.5%]'>Aviso
                        <span className= "cursor-pointer" onClick={handleCloseRegister}>&times;</span>
                    </label>
                    <label className="flex justify-center py-[15px]">
                        <box-icon name='error' size='100px'></box-icon>
                    </label>
                    <h2 className="font-custom font-extrabold my-0">Email ya registrado </h2>
                    <p className='font-custom font-semibold text-center mx-10 text-[15px]'>El email ingresado ya está en uso, por favor inicia sesión o intenta con otra cuenta. </p>
                    <h3 className="font-custom font-extrabold my-0"> {input.email} </h3>
                    <a className="font-bold font-custom outline-none text-center w-[200px] rounded-2xl py-[15px] my-[30px] bg-[black] text-white cursor-pointer transition duration-300 ease-in-out hover:bg-[transparent] hover:text-black hover:shadow-md" href="/login"  style={{ textDecoration: 'none' }} >Iniciar sesión</a>
                </div>
            </div>
        </div>       
    )
}

