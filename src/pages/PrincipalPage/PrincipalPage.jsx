import { useEffect, useState } from "react";
import { Filtros } from "./Filtro";
import { useAlojamientoPrincipal } from "../../Hooks/useAlojamientoPrincipal";
import { CardsPrincipal } from "./Cards y Card/CardsPrincipal";
import Filtro2 from "./Filtro2";
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
    <div className="flex flex-col mt-[10px] w-screen h-[100vh]  justify-center">
      <div className="flex flex-col justify-center items-center mq900:w-[113.5vw] w-full h-[100vh] mt-8 font-custom mq900:mt-4">
        {/* <Filtros /> */}
        <Filtro2></Filtro2>
        <CardsPrincipal />
      </div>
    </div>
  );
};

export default PrincipalPage;
