import "../Register/register.css"
import 'boxicons'

const Register = () => {
    return (
        <>
        <div className="form-information">
                <div className="form-information-childs">
                    <h2>Crear una cuenta</h2>
                    <div className="icons">
                        <box-icon name='google' type='logo' ></box-icon>
                    <p>o usa tu email para registrarte</p>
                    </div>
                    <form className="form-register">
                        <label className="labels">
                            <box-icon name='user' ></box-icon>
                            <input className="inputt" placeholder="usuario"></input> 
                        </label>
                        <label className="labels">
                            <box-icon name='envelope'></box-icon>
                            <input className="inputt" placeholder="correo electrónico"></input>
                        </label>
                        <label className="labels">
                            <box-icon name='lock-alt' ></box-icon>
                            <input className="inputt" placeholder="contraseña"></input>
                        </label>
                        <label className="labels">
                            <box-icon name='lock-alt' ></box-icon>
                            <input className="inputt" placeholder="repetir contraseña"></input>
                        </label>
                        <label className="labels">
                            <box-icon name='map-alt'></box-icon>
                            <select>
                               <option value="" disabled selected>Provincia</option>
                            </select>
                        </label> 
                        <label className="labels">
                            <box-icon name='map' ></box-icon>
                            <select>
                               <option value="" disabled selected>Localidad</option>
                            </select>

                        </label>
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