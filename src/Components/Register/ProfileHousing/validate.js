export const ValidateFormdata = (formdata) => {
  const {
    accommodationType,
    datesAvailable,
    datesEnd,
    images,
    location,
    price,
    services,
    square,
    title,
  } = formdata;



  
console.log(title);
  let errors = {
    msgAd:''
  };
  if (!title) {
    errors.title = "El nombre del alojamiento es requerido";
  }
  if (!location) {
    errors.location = "La ubicación es requerida";
  }

  if (!datesAvailable || !datesEnd) {
    errors.datesAvailable= "Debe seleccionar las fechas de inicio y fin";
  }

  if(!accommodationType){
    errors.accommodationType='Debe selecionar al menos un tipo de alojamiento'
  }

  
  if (!square || square <= 0) {
    errors.square = "La cantidad de plazas debe ser mayor que cero";
  }

  if (!price || price <= 0) {
    errors.price= "El precio por hora debe ser mayor que cero";
  }

  if (!services || services.length === 0) {
    errors.services= "Debe seleccionar al menos un servicio";
  }

  if (!images || images.length === 0) {
    errors.images= "Debe seleccionar al menos una imagen";
  }
  if (datesAvailable >= datesEnd) {
    errors.msgAd = "La fecha de fin debe ser posterior a la fecha de inicio";
   }
 
  return errors
};
