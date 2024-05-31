import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PetDetail from "./PetDetail";
const MySwal = withReactContent(Swal);
import axios from "axios";
import PetUpdate from "./PetUpdate";

const PetCard = ({ pet, getPets }) => {
  const delPet = async (petId) => {
    try {
      const URL = "http://localhost:3001/mascota/";
      await axios.delete(URL + petId);
      getPets();
      MySwal.fire({
        title: "Mascota borrada exitosamente",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

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
          showConfirmButton: false,
          html: <PetUpdate pet={pet} getPets={getPets} />,
        });
      }
      if (result.isDenied) {
        MySwal.fire({
          title: "Quieres borrar tu mascota de la base de datos?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            delPet(pet.id);
          }
        });
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
