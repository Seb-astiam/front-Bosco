import axios from "axios";

export const isValidEmail = async (email) => {
  try {
    // Verificar si el email está vacío
    if (!email) {
      return { valid: false, error: "*El email es requerido" };
    }

    // Expresión regular para validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Verificar el formato del email y que no tenga espacios alrededor
    if (!emailRegex.test(email.trim())) {
      return { valid: false, error: "*El email no tiene un formato válido" };
    }

        // Obtener todos los usuarios de la base de datos
        let response = await axios.get('/user');

        if(response === "No se encontraron usuarios") response.data = []
        const users = response.data;


    // Verificar si el email ya existe en la base de datos
    const emailExist = users.find((user) => user.email === email);
    if (emailExist) {
      return { valid: false, error: "*El email ya está registrado" };
    }

    // El email es válido
    return { valid: true };
  } catch (error) {
    if (error.response.status === 404) return { valid: true };
    return { valid: false, error: "*Error al validar el email" };
  }
};
