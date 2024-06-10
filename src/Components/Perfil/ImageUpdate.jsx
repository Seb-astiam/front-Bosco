import { useState } from "react";
import Swal from "sweetalert2";

const ImageUpdate = () => {
  const usuario = JSON.parse(localStorage.getItem("user"));
  const [imageSrc, setImageSrc] = useState(usuario.picture);
  const [showImg, setShowImg] = useState(true);
  const [inputImg, setInputImg] = useState([]);

  const handleChange = (e) => {
    setInputImg([
      ...inputImg,
      ...Array.from(e.target.files).slice(0, 1 - inputImg.length),
    ]);
    console.log(e.target.files[0]);
    const imgURL = URL.createObjectURL(e.target.files[0]);
    setImageSrc(imgURL);
    setShowImg(false);
    setShowImg(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const cancelClick = (e) => {
    e.preventDefault();
    Swal.close();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center">
          <div className="flex items-center mr-2">
            {showImg && (
              <div className="relative">
                <img
                  src={imageSrc}
                  className="h-32 w-32 object-cover mr-2 rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="w-32 ">
            <input
              type="file"
              accept="image/*"
              name="images"
              id="images"
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="images"
              className="flex justify-center relative px-4 bg-orange-300 rounded-lg cursor-pointer border border-gray-300 hover:bg-orange-500 focus:border-blue-500 focus:outline-none text-mini-3 font-custom font-bold text-white text-center hover:-translate-y-1 active:translate-y-1 shadow-xl mt-2 transition"
            >
              <span className="m-2">Elegir...</span>
            </label>
            <div>
              <button onClick={cancelClick}> Cambiar</button>
              <button onClick={cancelClick}> Cancelar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImageUpdate;
