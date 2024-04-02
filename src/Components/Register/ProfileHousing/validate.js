export const ValidateFormdata = (formdata) => {
  const {
    accommodationType,
    datesAvailable,
    datesEnd,
    images,
    provinces,
    cities,
    price,
    services,
    square,
    title,
  } = formdata;

 
  let errors = {};
  if (!title) {
    errors.title = "El nombre del alojamiento es requerido";
  }
  if (!provinces) {
    errors.provinces = "Debes seleccionar una provincia";
  }
  if (!cities) {
    errors.cities = "Debes seleccionar una localidad";
  }

  if (!datesAvailable || !datesEnd) {
    errors.datesAvailable = "Debe seleccionar las fechas de inicio y fin";
  }

  if (!accommodationType) {
    errors.accommodationType =
      "Debe selecionar al menos un tipo de alojamiento";
  }

  if (!square || square <= 0) {
    errors.square = "La cantidad de plazas debe ser mayor que cero";
  }

  if (!price || price <= 0) {
    errors.price = "El precio por hora debe ser mayor que cero";
  }

  if (!services || services.length === 0) {
    errors.services = "Debe seleccionar al menos un servicio";
  }

  if (!images || images.length === 0) {
    errors.images = "Debe seleccionar al menos una imagen";
  }

  //Cambiar esto en la nueva rama real
  const startDate = new Date(datesAvailable);
  const endDate = new Date(datesEnd);
  

  if (startDate.getTime() > endDate.getTime()) {
    errors.datesEnd =
      "La fecha de fin debe ser posterior o igual a la fecha de inicio";
  }
  //-----------------------------------------------------------
  return errors;
};
