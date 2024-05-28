import { FaLocationDot } from "react-icons/fa6";

export const HousingCard = ({alojamiento, openModal}) => {
    return (
        <div className="flex flex-col h-60 aspect-video border border-black border-solid ml-5 cursor-pointer shadow-custom-shadow"
            onClick={openModal}
        >
            <img src={alojamiento.images[0]} className="w-full h-full"/>

            <div className="absolute bg-black bg-opacity-50  ">
                <h4 className="m-5 font-custom font-extralight">{alojamiento.title}</h4>
            </div>
            <div className="relative bg-black bg-opacity-50 flex h-12 items-center justify-start p-2 top-[-63px] font-custom gap-3 font-extralight">
                <FaLocationDot />
                <p>{alojamiento.cities},</p>
                <p>{alojamiento.provinces}</p>
            </div>
        </div>
    )
}