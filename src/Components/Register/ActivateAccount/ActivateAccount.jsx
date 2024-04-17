import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import bosco from "../../../assets/bosco-logo.jpeg";

const ActivateAccount = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const token = searchParams.get("token");
      const { data } = await axios.post(
        `/auth/activate-account/${token}`
      );
      Swal.fire({
        title: "Bienvenido a Bosco!",
        text: data,
        icon: "success",
        confirmButtonText: "Ir a login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Algo salió mal",
        text: error.response.data,
        icon: "error",
        confirmButtonText: "Ir a login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      console.log(error);
    }
  };

  return (
    <div className=" w-screen h-[70vh] flex justify-center mt-10 items-center">
      <div className="h-[90%] w-[80%] flex justify-center ">
        <div className="h-[100%] w-[50%] rounded-bl-[20px] rounded-tl-[20px] max-w-[400px]">
          <img
            src={bosco}
            alt="bosco"
            className="rounded-bl-[20px] rounded-tl-[20px] w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center px-[5%] justify-center h-[100%] w-[50%] rounded-br-[20px] rounded-tr-[20px] max-w-[400px] !bg-[#FEB156] ">
          <h1 className="font-custom font-extrabold">Bienvenido a Bosco</h1>

          <h2 className="font-custom font-semibold text-center">
            Termina la activacion de tu cuenta cliqueando el boton
          </h2>

          <button
            className="font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 bg-[black] text-white shadow-md "
            onClick={handleClick}
          >
            Finalizar activación
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;
