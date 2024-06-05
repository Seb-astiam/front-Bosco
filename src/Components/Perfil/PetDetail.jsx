const PetDetail = ({ pet }) => {
  const {
    name,
    image,
    age,
    aggressiveness,
    coexistence,
    genre,
    raze,
    type,
    size,
  } = pet;
  return (
    <div>
      <h2 className="font-custom font-bold">{name}</h2>

      <div className="flex flex-row justify-around items-start">
        <div className=" shadow-sm shadow-outline rounded-xl">
          <img className="w-64 rounded-xl shadow-lg" src={image} alt={name} />
        </div>
        <div className="flex flex-col items-start bg-orange-300 p-4 rounded-xl shadow-lg">
          <p className="font-custom font-light my-2">
            <strong>Edad: </strong>
            {age}
            {age > 1 ? " años" : " año"}
          </p>
          <p className="font-custom font-light my-2">
            <strong>Temperamento: </strong>
            {aggressiveness ? "Agresivo" : "Dócil"}
          </p>
          <p className="font-custom font-light my-2">
            <strong>Vive con otros animales: </strong>
            {coexistence ? "Sí" : "No"}
          </p>
          <p className="font-custom font-light my-2">
            <strong>Sexo: </strong>
            {genre === "he" ? "Masculino" : "Femenino"}
          </p>
          <p className="font-custom font-light my-2">
            <strong>Raza: </strong>
            {raze}
          </p>
          <p className="font-custom font-light my-2">
            <strong>Tipo: </strong>
            {type}
          </p>
          <p className="font-custom font-light my-2">
            <strong>Tamaño: </strong>
            {size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
