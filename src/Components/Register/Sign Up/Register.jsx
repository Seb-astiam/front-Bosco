import "../Sign Up/register.css"
import 'boxicons'
import React, { useEffect, useState } from "react";
import { isValidUsername } from "../../Validations/validUserName";
import { isValidEmail } from "../../Validations/validEmail";
import { isValidPassword } from "../../Validations/validPassword";
import { isValidPasswordConfirmation } from "../../Validations/validPasswordConfirmation";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


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
    
            // Validar el nombre en tiempo real solo para el input de name

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
    /***********************************/

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handlePasswordConfirmationVisibility = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    }

    /*************************************************************** */

    const [termsChecked, setTermsChecked] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        // Verificar si todos los campos son válidos y el checkbox está marcado
        const isValid = Object.values(inputError).every(field => field.valid) && termsChecked;
        setFormValid(isValid);
    }, [inputError, termsChecked]);


    const handleCheckboxChange = () => {
        setTermsChecked(!termsChecked);
    }

    /************************************************ */


    /******************************** */
    const [verificationSuccessful, setVerificationSuccessful]= useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Verificar si hay algún campo con valid: false
        const isValid = Object.values(inputError).every(field => field.valid);
      
        if (!isValid) {
          // Mostrar mensaje de error
          window.alert('Por favor, complete todos los campos correctamente antes de enviar.');
          return;
        }
      
        try {
          const responseBack = await axios.post("http://localhost:3001/user", input, {
            headers: {
              'Content-Type': 'application/json',
            },
      
          });

          //! acá debería verificar el correo!
          setVerificationSuccessful(true)
          //navigate("/principal")
          //window.alert('usuario creado correctamente!');
          
        } catch (error) {
          window.alert('Error al crear usuario')
        }
      };
      /************************** */

      const handleClose = () => {
        // Realizar la redirección al presionar el botón de cierre
        navigate('/');
      };

    return (

        <div className="register-container">
        <div className={`form-information ${verificationSuccessful? 'hide1' : ''}`}>
                <div className= "form-information-childs">
                    <h2>Crear una cuenta</h2>
                    <div className="icons">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAcFJREFUSEvV1UuoT1EUBvDfHXiFDExNJEVEDLwiQ24yFMoAI0OUMpABSQqZGl0Tr+7g3iRGSmFgpAghJSZIEQnldZbOrd129v+/u3WLXadTZ317fWt9e+3vDJjgNTDB+f0TBMuxASuxhj9FPcZTXMVoLxV6dTAZJ7C3j4y3sQWvu3AlgoUYbp5FlWcUhRysJZiK+5jfseEJvmMeAhfrInbgZy3BaexLwN9wDGfxtv0+qUl4GNHpVvwodZpLtB43E/AnLMPzSqn+guUEF7A9Qe3G0HiTx76c4C5WtAk/YlaWfFozrtf7EB7FjTFMTvAOs9tgjN+6LNkMhGy91gGcLBG8wpw2eAdrx0EQA3KmRHAFm9vgF0zHr4SkS6LoeHGC2dZM1+USQeh3KAHvwrk+kpzC/gQzFy9KBBF8lFyiD1iKlwWSJYizmtnGH2bddLppXPnjScL3TUU7EfKNrfCpPTiSTVqM+KW0mC4vilt6r8OHguhZMyExSWEVU7KurmFT3mnJ7BY00ow01cS7Zt3CID7XEgQuZAip0gPM939FeFf4Uqcf1fzRwos2YjVWtbf/QfuzOY83vVqsIaiRqIj5/wl+A2MwRxkhHnjuAAAAAElFTkSuQmCC"/>
                    <p className="parrafo">o usa tu email para registrarte</p>
                    </div>
                    <form className="form-register" onSubmit={handleSubmit}>
                        <div className="name-container">
                        <label className="labels">
                            <box-icon name='user' ></box-icon>
                            <input name= "name" className="inputt" value={input.name}  onChange={handleChange} placeholder="usuario"></input> 
                        </label>
                        </div>
                        <p className="errors">{inputError.name.error}</p>
                        <div className="email-container">
                        <label className="labels">
                            <box-icon name='envelope'></box-icon>
                            <input name= "email" className="inputt" value={input.email}  onChange={handleChange} placeholder="correo electrónico"></input>
                        </label>
                        </div>
                        <p className="errors">{inputError.email.error}</p>
                        <div className="password-container">
                        <label className="labels">
                            <box-icon name='lock-alt' ></box-icon>
                            <input 
                            name= "password" 
                            className="inputt" 
                            value={input.password}
                            onChange={handleChange} 
                            placeholder="contraseña"
                            type={showPassword ? 'text' : 'password'}
                            >
                            </input>
                        </label>
                        <Box-icon name={showPassword ? 'show' : 'low-vision'} onClick={handlePasswordVisibility} size= '30px'/>
                        </div>
                        <p className="errors">{inputError.password.error}</p>
                        <div className="passwordConfirmation-container">
                        <label className="labels password">
                            <box-icon name='lock-alt' ></box-icon>
                            <input 
                            name = "passwordConfirmation" 
                            className="inputt password" 
                            value={input.passwordConfirmation}  
                            onChange={handleChange} 
                            placeholder="repetir contraseña"
                            type={showPasswordConfirmation ? 'text' : 'password'}
                            >
                            </input>
                        </label>
                        <Box-icon name={showPassword ? 'show' : 'low-vision'} onClick={handlePasswordConfirmationVisibility} size= '30px' />
                        </div>
                        <p className="errors">{inputError.passwordConfirmation.error}</p>
                        <label className="check">
                            <input className="check-input" type="checkbox" checked= {termsChecked} onChange={handleCheckboxChange}/>
                            <p className= "texto"> Acepto los <a href="/terms" className="text-blue-500 hover:underline">Términos y condiciones</a> y autorizo el uso de mis datos de acuerdo a la <a href="/declaration" className="text-blue-500 hover:underline">Declaración de Privacidad.</a>
                             </p>
                        </label>
                        <label className="check">
                            <input className="check-input" type="checkbox"  />
                            <p className= "texto">Quiero recibir notificaciones</p>
                        </label>
                        <button className={`register-button ${formValid ? 'enabled' : 'disabled'}`} disabled={!formValid}> Registrarme </button>

                    </form>
                    
                </div>
                <div className= {`email-verification ${verificationSuccessful? '' : 'hide1'}`}>
                        <label className='verification'>Verificá tu email
                            <span className='close-verification' onClick={handleClose}>&times;</span>
                        </label>
                        <label className="icon-email">
                            <box-icon name='check-shield' size='80px'></box-icon>
                        </label>
                        <h2>Hola {input.name}! </h2>
                        <p className='text-verification'>Confirmanos si esta realmente es tu dirección de email para ayudarnos a mantener tu cuenta segura. Este email tiene una caducidad de 24hs, fué enviado a: </p>
                        <h3> {input.email} </h3>
                        <a className="verification-button" href="https://mail.google.com/mail/u/0" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} >Confirmá tu email</a>
                    </div>
        </div>
        </div>       
    )
}

