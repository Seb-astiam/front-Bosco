import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PetDetail from "./PetDetail";
const MySwal = withReactContent(Swal);

const PetCard = ({ pet }) => {
  const handleClick = () => {
    MySwal.fire({
      width: "600px",
      html: <PetDetail pet={pet} />,
      showCloseButton: true,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Editar",
      denyButtonText: "Borrar",
      cancelButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Edite jefe",
          text: "Aca va el form",
          icon: "success",
        });
      }
      if (result.isDenied) {
        MySwal.fire("Borraste el bicho, pibe");
      }
    });
  };

  return (
    <div
      className="aspect-video w-72 bg-cover mx-4 shadow-md shadow-outline"
      style={{ backgroundImage: `url(${pet.image})` }}
    >
      <div
        className={`aspect-video w-72 flex flex-col justify-end align-middle  opacity-75 hover:opacity-100 hover:cursor-pointer`}
        onClick={handleClick}
      >
        {/* <div className="w-80">
        <img className="w-80" src={pet.image} alt="" />
      </div> */}
        <p className="bg-gray-900 m-0 font-custom font-light text-[20px] text-center align-middle p-2">
          {pet.name}
        </p>
      </div>
    </div>
  );
};

export default PetCard;
