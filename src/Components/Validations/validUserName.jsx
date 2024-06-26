export const isValidUsername = (username) => {
    try {
        if (!username) {
            return { valid: false, error: '*El nombre de usuario es requerido' };
        }

        if (username.length > 35) {
            return { valid: false, error: '*El nombre de usuario no puede tener más de 35 caracteres' };
        }

        // Verificar si el nombre de usuario contiene caracteres especiales o números
        if (!/^[a-zA-Z\s]+$/.test(username)) {
            return { valid: false, error: '*El nombre de usuario solo puede contener letras y espacios' };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: '*Error al validar el nombre de usuario' };
    }
};
