export const ValidateFormdata = (formdata) => {
    const { nombre, email, telefono, direccion } = formdata;
  
    let errors = {};
  
    if (!nombre) {
      errors.nombre = "El nombre de la empresa es requerido";
    }
  
    if (!email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "El correo electrónico no es válido";
    }
  
    if (!telefono) {
      errors.telefono = "El número de teléfono es requerido";
    } else if (!/^\d{10}$/.test(telefono)) {
      errors.telefono = "El número de teléfono debe tener 10 dígitos";
    }
  
    if (!direccion) {
      errors.direccion = "La dirección es requerida";
    }
  
    return errors;
  };
  