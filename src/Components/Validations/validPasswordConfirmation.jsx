export const isValidPasswordConfirmation = (password, passwordConfirmation) => {
    console.log("passwordConfirmation", passwordConfirmation)
    console.log("password", password)
    try {
        // Verificar si la contraseña y la confirmación de contraseña están vacías
        if (!passwordConfirmation) {
            return { valid: false, error: '*Ambos campos de contraseña son requeridos' };
        }

        // Verificar si la contraseña y la confirmación de contraseña son iguales
        if (password !== passwordConfirmation) {
            return { valid: false, error: '*Las contraseñas no coinciden' };
        }

        // Si no hay ningún error, devolver que la validación es exitosa
        return { valid: true };

    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la validación
        return { valid: false, error: '*Error al validar la confirmación de contraseña' };
    }
};
