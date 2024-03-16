import 'boxicons'
import '../Pruebas/Pruebas.css'

const Pruebas = ()=> {
    return (

        <div className="login-error">
            <label className='aviso'>Aviso
                <span className='close-error'>&times;</span>
            </label>
            <label className="icon-error">
                <box-icon name='error'  size= '80px'
                ></box-icon>
            </label>
            <p>Usuario o contraseña incorrecto. Por favor, ingresalos nuevamente.</p>
            <button className= "back-button">Volver</button>
        </div>


    )
}

export default Pruebas;
