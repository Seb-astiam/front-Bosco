export const isValidPassword = (password) => {
    try {
        // Verificar si la contraseña está vacía
        if (!password) {
            return { valid: false, error: '*La contraseña es requerida' };
        }

        // Verificar la longitud de la contraseña
        if (password.length < 8) {
            return { valid: false, error: '*La contraseña debe tener al menos 8 caracteres' };
        }

        // Verificar si la contraseña contiene al menos una mayúscula y una minúscula
        if (!/[A-Z]+/.test(password) || !/[a-z]+/.test(password)) {
            return { valid: false, error: '*La contraseña debe contener al menos una mayúscula y una minúscula' };
        }

        // Verificar si la contraseña contiene algún caracter especial
        if (!/[^A-Za-z0-9\s]/.test(password)) {
            return { valid: false, error: '*La contraseña debe contener al menos un caracter especial' };
        }

        // Verificar si la contraseña contiene números en escalera o consecuentes
        const consecutiveNumbers = /012|123|234|345|456|567|678|789/;
        if (consecutiveNumbers.test(password)) {
            return { valid: false, error: '*La contraseña no puede contener números en escalera o consecuentes' };
        }

        // La contraseña es válida
        return { valid: true };
    } catch (error) {
        return { valid: false, error: '*Error al validar la contraseña' };
    }
};
