export const isValidUsername = (username) => {
    try {
        // Verificar si el nombre de usuario está vacío
        if (!username) {
            return { valid: false, error: '*El nombre de usuario es requerido' };
        }

        // Verificar la longitud del nombre de usuario
        if (username.length > 35) {
            return { valid: false, error: '*El nombre de usuario no puede tener más de 35 caracteres' };
        }

        // Verificar si el nombre de usuario contiene caracteres especiales o números
        if (!/^[a-zA-Z\s]+$/.test(username)) {
            return { valid: false, error: '*El nombre de usuario solo puede contener letras y espacios' };
        }

        // El nombre de usuario es válido
        return { valid: true };
    } catch (error) {
        return { valid: false, error: '*Error al validar el nombre de usuario' };
    }
};
