import axios from "axios";
import { useEffect, useState } from "react";
import PetCard from "./PetCard";
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

const CantMascotas = ({ userId }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
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
    getPets();
  }, []);

  return (
    <div>
      <h2>Mascotas</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        // autoPlay={true}
        // autoPlaySpeed={1000}
      >
        {pets.map((pet) => (
          <PetCard pet={pet} />
        ))}
        <div className={`aspect-video w-80 bg-cover `}>1</div>
        <div className={`aspect-video w-80 bg-cover `}>2</div>
        <div className={`aspect-video w-80 bg-cover `}>3</div>
      </Carousel>
    </div>
  );
};

export default CantMascotas;
