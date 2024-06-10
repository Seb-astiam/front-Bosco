import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import store from '../../Redux/store';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'; 

import { FaLocationDot } from "react-icons/fa6";
import { HousingDetail } from "./HousingDetail";
import { HousingUpdate } from "./HousingUpdate";

export const HousingCard = ({alojamiento, getHousings}) => {
    const delHousing = async () => {

    }

    const handleClick = () => {
        MySwal.fire({
            width: "700px",
            html: <HousingDetail alojamiento={alojamiento} />,
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
                html: <div id="housing-update-container"></div>,
                didOpen: () => {
                    const container = document.getElementById('housing-update-container');
                    const root = ReactDOM.createRoot(container);
                    root.render(
                        <Provider store={store}>
                            <HousingUpdate alojamiento={alojamiento} getHousings={getHousings} />
                        </Provider>
                    );
                },
              });
            }
            if (result.isDenied) {
              MySwal.fire({
                title: "Quieres borrar tu alojamiento de la base de datos?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                    delHousing(alojamiento.id);
                }
              });
            }
          });
    }

    return (
        <div className="flex flex-col h-60 aspect-video border border-black border-solid ml-5 cursor-pointer shadow-custom-shadow"
            onClick={handleClick}
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