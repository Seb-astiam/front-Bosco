const PetCard = ({ pet }) => {
  return (
    <div
      className={`aspect-video w-80 bg-cover `}
      style={{ backgroundImage: `url(${pet.image})` }}
    >
      {/* <div className="w-80">
        <img className="w-80" src={pet.image} alt="" />
      </div> */}
      <h2>{pet.name}</h2>
    </div>
  );
};

export default PetCard;
