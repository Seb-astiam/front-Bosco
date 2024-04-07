import { useEffect, useState } from "react";
import { Filtros } from "./Filtro";
import { useAlojamientoPrincipal } from "../../Hooks/useAlojamientoPrincipal";
import { CardsPrincipal } from "./Cards y Card/CardsPrincipal";

const PrincipalPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useAlojamientoPrincipal();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col mt-[10px] rounded-full">
      <div className="flex items-start w-full h-[100vh] ">
        {windowWidth >= 1200 && <Filtros />}
        <CardsPrincipal />
      </div>
    </div>
  );
};

export default PrincipalPage;
