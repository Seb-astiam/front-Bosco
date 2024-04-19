import { useEffect, useState } from "react";

const DetailImages = ({ images }) => {
  const [order, setOrder] = useState([0, 1, 2]);

  const handleImageClick = (index) => {
    const temp = order;
    const temp2 = order[0];
    temp[0] = temp[index];
    temp[index] = temp2;
    console.log(temp);

    setOrder([...temp]);
  };
  useEffect(() => {}, [order]);

  return (
    <div className="flex flex-row justify-center items-center h-[525px] px-[20px]">
      <div className="flex w-full lg:w-[60%] gap-6 py-6 mr-[20px]">
        <img
          src={images[order[0]]}
          alt=""
          className="w-full h-[500px] bg-cover rounded-tl-xl rounded-bl-xl"
        />
      </div>
      <div className="flex flex-col w-[40%] gap-6 py-6">
        <img
          src={images[order[1]]}
          alt=""
          className="w-full h-[235px] object-cover cursor-pointer rounded-tr-xl"
          onClick={() => handleImageClick(1)}
        />
        <img
          src={images[order[2]]}
          alt=""
          className="w-full h-[235px] object-cover cursor-pointer rounded-br-xl"
          onClick={() => handleImageClick(2)}
        />
      </div>
    </div>
  );
};

export default DetailImages;