const LoginPage = ()=>{

    return (
        <form className="form-login">
           <input placeholder="nombre"></input> 
           <input placeholder="apellido"></input>
           <input placeholder="correo electrónico"></input>
           <input placeholder="contraseña"></input>
           <input placeholder="repetir contraseña"></input>
           <select placeholder="localidad"></select>
           <button>Registrar</button>

        </form>
    )

}
export default LoginPage;
