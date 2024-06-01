import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
};

export const HousingDetail = ({alojamiento}) => {
    const { 
        accommodationType, 
        datesAvailable, 
        datesEnd, 
        images, 
        provinces, 
        cities, 
        price, 
        square, 
        title, 
        hourly,
        hourEnd,
        hourAvailable
    } = alojamiento;

    return (
        <div>
            <h2 className="font-custom">{title}</h2>
            <Carousel
                responsive={responsive}
                infinite={true}
            >
                {images.map((image) => {
                    return (
                        <img src={image} className="w-28 h-28" ></img>
                    )
                })}
            </Carousel>

            <div className="font-custom text-left">
                <p>
                    <strong>Tipo de Alojamiento: </strong>
                    {accommodationType}
                </p>

                <p>
                    <strong>Ubicacion: </strong>
                    {cities}, {provinces}
                </p>

                <p>
                    <strong>Capacidad para alojar mascotas: </strong>
                    {square}
                </p>

                <p>
                    <strong>Precio: </strong>
                    {price} 
                    <strong> ARS</strong>
                </p>

                {hourly ? 
                    <p className="text-center">
                        <strong>Alojamiento por Horas</strong>

                        <div>
                            <p>
                                <strong>Entrada: </strong>
                                {hourAvailable} AM
                            </p>

                            <p>
                                <strong>Salida: </strong>
                                {hourEnd} PM
                            </p>

                        </div>
                        
                    </p>

                    :

                    <p className="text-center">
                        <strong className="text-xl">Alojamiento por dias</strong>

                        <div>
                        <p>
                                <strong>Inicio de Disponibilidad: </strong>
                                {datesAvailable}
                            </p>

                            <p>
                                <strong>Fin de disponibilidad: </strong>
                                {datesEnd}
                            </p>
                        </div>
                    </p>
                }
            </div>
        </div>
    )
}