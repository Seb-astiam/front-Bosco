import axios from "axios";
import { useEffect, useState } from "react";
import PetCard from "./PetCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
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

const CantMascotas = ({ userId }) => {
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    try {
      const { data } = await axios(
        `http://localhost:3001/allMascotas/${userId}`
      );

      setPets((prev) => data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div>
      <h2 className="font-custom font-extralight text-black">Mascotas</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        // autoPlay={true}
        // autoPlaySpeed={1000}
      >
        {pets.map((pet) => (
          <PetCard pet={pet} getPets={getPets} />
        ))}

      <div className={`aspect-video w-72 `}>
          <Link 
              className="w-72 aspect-video border-2 border-black 
              border-dashed bg-opacity-100 font-custom ml-5 flex 
              items-center flex-col justify-center no-underline text-black
              shadow-custom-shadow"
              to="/ProfileHousing"
          >
              <IoAddCircleOutline className="w-10 h-10"/>
              <h5>Añadir Mascota</h5>
          </Link>
      </div>
        {/* <div className={`aspect-video w-80 bg-cover `}>1</div>
        <div className={`aspect-video w-80 bg-cover `}>2</div>
        <div className={`aspect-video w-80 bg-cover `}>3</div> */}
      </Carousel>
    </div>
  );
};

export default CantMascotas;
