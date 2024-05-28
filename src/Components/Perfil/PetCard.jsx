const PetCard = ({ pet }) => {
  return (
    <div
      className={`aspect-video w-72 bg-cover flex flex-col justify-end align-middle  bg-opacity-100 mx-4`}
      style={{ backgroundImage: `url(${pet.image})` }}
    >
      {/* <div className="w-80">
        <img className="w-80" src={pet.image} alt="" />
      </div> */}
      <p className="bg-gray-900 opacity-75 hover:opacity-100 hover:cursor-pointer  m-0 font-custom font-light text-[20px] text-center align-middle p-2">
        {pet.name}
      </p>
    </div>
  );
};

export default PetCard;
