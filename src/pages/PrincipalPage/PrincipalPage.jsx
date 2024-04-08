import { Filtros } from "./Filtro";
import { useAlojamientoPrincipal } from "../../Hooks/useAlojamientoPrincipal";
import { CardsPrincipal } from "./Cards y Card/CardsPrincipal";


const PrincipalPage = () => {
  useAlojamientoPrincipal();

  return (
    <div className="flex flex-col mt-[10px] w-screen h-[100vh]  justify-center">
      <div className="flex flex-col justify-center items-center mq900:w-[113.5vw] w-[100vw] h-[100vh] mt-16 font-custom">
        <Filtros />
        <CardsPrincipal/>
      </div>
    </div>
  );
};

export default PrincipalPage;
