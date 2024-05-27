import { CiEdit } from "react-icons/ci";
import CantMascotas from "./CantMascotas";

export const Perfil = () => {
  const usuario = JSON.parse(localStorage.getItem("user"));
  const div =
    "w-full bg-red-300 h-full  text-white font-monserrat text-4xl border border-solid border-black text-center";

  return (
    <div className="w-full h-screen bg-slate-400 grid grid-cols-3 gap-3 p-3">
      <div className={`${div} flex items-center justify-center`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={usuario.picture}
              className="w-[150px] h-[150px] rounded-full"
            />
            <button className="absolute bottom-0 right-0 rounded-full h-[40px] w-[40px] flex items-center justify-center bg-white border border-gray-300">
              <CiEdit className="h-[20px] w-[20px]" />
            </button>
          </div>
          <h1 className="text-xl font-bold">{usuario.name}</h1>
          <p className="text-gray-600">Perfil</p>
        </div>
      </div>

      <div className={`${div} col-span-2`}>2</div>
      <div className={`${div} `}>3</div>
      <div className={`${div} col-span-2`}>
        <CantMascotas userId={usuario.id} />
      </div>
    </div>
  );
};
