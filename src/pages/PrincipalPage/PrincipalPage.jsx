import { Filtros } from "./Filtro";
import { Nav } from "./Nav";
import { useAlojamientoPrincipal } from "../../Hooks/useAlojamientoPrincipal";
import { CardsPrincipal } from "./Cards y Card/CardsPrincipal";

const PrincipalPage = () => {
  useAlojamientoPrincipal();

  return (
    <div className="flex flex-col">
      <div className="flex items-start w-full h-[100vh] ">
        <Filtros />
        <CardsPrincipal />
      </div>
    </div>
  );
};

export default PrincipalPage;
