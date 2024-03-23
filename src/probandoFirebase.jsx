import { FcGoogle } from "react-icons/fc";

import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from 'axios';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBkyy5E9i1Jalvf-2_7yGGyqecR8569Dc8",
  authDomain: "bosco-ed9d5.firebaseapp.com",
  projectId: "bosco-ed9d5",
  storageBucket: "bosco-ed9d5.appspot.com",
  messagingSenderId: "306541328405",
  appId: "1:306541328405:web:abcdef1234567890"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Crear una instancia del objeto proveedor de Facebook
const provider = new FacebookAuthProvider();

// Especificar los alcances de OAuth 2.0 adicionales que deseas solicitar
provider.addScope('email');
provider.addScope('public_profile');

// Función para iniciar sesión con Facebook
const signInWithFacebook = () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // Información del usuario registrado
      const user = result.user;

      // Token de acceso de Facebook
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // Datos adicionales del proveedor de identidad
      const additionalUserInfo = result.additionalUserInfo;
      if (additionalUserInfo) {
        // Obtener el nombre y el correo electrónico del registro
        const name = additionalUserInfo.profile.name;
        const email = additionalUserInfo.profile.email;

        // Utilizar el nombre y el correo electrónico como desees
        // console.log("Nombre:", name);
        // console.log("Email:", email);
      }
    })
    .catch((error) => {
      // Manejar errores aquí
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};

const FacebookLoginButton = () => {
  const handleFacebookLogin = () => {
    signInWithFacebook();
  };

  return (
    <button onClick={handleFacebookLogin}>
      Iniciar sesión con Facebook
    </button>
  );
};

export default FacebookLoginButton;




// const Login = () => {
  
//   const [user, setUser] = useState([]);
//   // guarda entre otras cosas que no sirven, una propiedad access_token 
//   // que sirve para acceder a los datos del usuario

//   const [profile, setProfile] = useState([]);
//   // guarda los siguientes detalles:
//   // id, email, verified_email (boolean), name, family_name, given_name, locale, picture
  
//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => {setUser(codeResponse)
//     },
//     onError: (error) => console.log("Login Failed:", error)
//   });

//   useEffect(() => {
//     if (user) {
//       axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
//           {
//             headers: {
//               Authorization: `Bearer ${user.access_token}`,
//               Accept: "application/json",
//             },
//           }
//         )
//         .then((res) => {
//           setProfile(res.data);
//         })
//         .catch((error) => console.log(error));
//     }
//   }, [user]);

//   return (
//           <div className="shadow-2xl">
//             <button
//               type="button"
//               className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
//               onClick={() => login()}
//             >
//               <FcGoogle className="mr-4" />
              
//             </button>
//           </div>
//   );
// };

//export default Login;