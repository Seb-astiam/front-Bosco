// import useCities from "../../Hooks/useCities";
// import useProvinces from "../../Hooks/useProvinces";
import "../Register/register.css"
import 'boxicons'
import React, { useState } from "react";
import { isValidUsername } from "../Validations/validUserName";
import { isValidEmail } from "../Validations/validEmail";
import { isValidPassword } from "../Validations/validPassword";
import { isValidPasswordConfirmation } from "../Validations/validPasswordConfirmation";
import axios from 'axios'
//import { isValidOption } from "../Validations/validOptions";

const Register = () => {

        const [input, setInput] = useState({
            name: "",
	        email: "", 
	        password: "", 
            passwordConfirmation: ""
	        // province: "", 
	        // city: "", 
	        // address: string, 
	        // phone: string, 
	        // balance: decimal
            // housingProfile: boolean , por defecto en false
            // petProfile:boolean, por defecto en false

        });

        const [inputError, setInputError] = useState({

            name: { valid: false, error: '' },
            email: { valid: false, error: '' },
            password: { valid: false, error: '' },
            passwordConfirmation: { valid: false, error: '' }
            //* province: { valid: false, error: '' },
            //* city: { valid: false, error: '' },
        
        });

        console.log("input", input)
        console.log("error", inputError)

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
          
    /************************************************************ */
    // const handleTypeChange = async (e) => {
    //     // Valida las opciones seleccionadas
    //     const { valid, error } = await isValidOption(e.target.value);
      
    //     // Actualiza el estado de error
    //     setInputError((prevInputError) => ({
    //       ...prevInputError,
    //       province: { valid, error }
    //     }));
      
    //     // Actualiza el estado de input solo si las opciones son válidas
    //     if (valid) {
    //       setInput((prevInput) => ({
    //         ...prevInput,
    //         province: e.target.value
    //       }));
    //     }
    //   };

    /************************************************ */

    // const [selectedProvince, setSelectedProvince] = useState("");
    // const handleProvinceChange = (e) => {
    //     setSelectedProvince(e.target.value);
    // };

    // const provinces = useProvinces();
    
    // const optionProvinces = provinces.map(type => (
    //     <option key={type.id} value={type.id}>{type.name}</option>
    //   ));
    /************************************************ */

    // const cities = useCities(selectedProvince);

    // const optionCities = cities.map(city => (
    //     <option key={city.id} value={city.id}>{city.name}</option>
    // ))

    /******************************** */
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
          window.alert('usuario creado correctamente!');
          
        } catch (error) {
          window.alert('Error al crear usuario')
        }
      };
      

    return (
        <>
        <div className="form-information">
                <div className="form-information-childs">
                    <h2>Crear una cuenta</h2>
                    <div className="icons">
                        <box-icon name='google' type='logo' ></box-icon>
                    <p>o usa tu email para registrarte</p>
                    </div>
                    <form className="form-register" onSubmit={handleSubmit}>
                        <label className="labels">
                            <box-icon name='user' ></box-icon>
                            <input name= "name" className="inputt" value={input.name}  onChange={handleChange} placeholder="usuario"></input> 
                        </label>
                        {inputError.name.error}
                        <label className="labels">
                            <box-icon name='envelope'></box-icon>
                            <input name= "email" className="inputt" value={input.email}  onChange={handleChange} placeholder="correo electrónico"></input>
                        </label>
                        {inputError.email.error}
                        <label className="labels">
                            <box-icon name='lock-alt' ></box-icon>
                            <input name= "password" className="inputt" value={input.password}  onChange={handleChange} placeholder="contraseña"></input>
                        </label>
                        {inputError.password.error}
                        <label className="labels">
                            <box-icon name='lock-alt' ></box-icon>
                            <input name = "passwordConfirmation" className="inputt" value={input.passwordConfirmation}  onChange={handleChange} placeholder="repetir contraseña"></input>
                        </label>
                        {inputError.passwordConfirmation.error}
                        {/* <label className="labels">
                            <box-icon name='map-alt'></box-icon>
                            <select value={selectedProvince} onChange={handleProvinceChange}>
                               <option value="" disabled selected>Provincia</option>
                               { optionProvinces }
                            </select>
                        </label> 
                        <label className="labels">
                            <box-icon name='map' ></box-icon>
                            <select>
                               <option value="" disabled selected>Localidad</option>
                               { optionCities}
                            </select>

                        </label> */}
                        <label className="check">
                            <input className="check-input" type="checkbox" />
                            <p> Acepto los Términos y condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad.</p>
                        </label>
                        <label className="check">
                            <input className="check-input" type="checkbox"  />
                            <p>Quiero recibir notificaciones</p>
                        </label>
                        <button className="register-button"> Registrarme </button>

                    </form>
                </div>
        </div>

        
    </>        
    )
}

export default Register;