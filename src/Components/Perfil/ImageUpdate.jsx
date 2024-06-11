import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ImageUpdate = () => {
  const usuario = JSON.parse(localStorage.getItem("user"));
  const [imageSrc, setImageSrc] = useState(usuario.picture);
  const [showImg, setShowImg] = useState(true);
  const [inputImg, setInputImg] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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
    setButtonDisabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      inputImg.forEach((image) => formDataToSend.append("images", image));

      const response = await axios.put(
        `/user/picture/${usuario.email}`,
        formDataToSend
      );
      if (response.status === 200) {
        const userUpdated = await axios(`/user/${usuario.email}`);
        usuario.picture = userUpdated.data.picture;
        localStorage.setItem("user", JSON.stringify(usuario));
        Swal.fire({
          title: "Imagen actualizada",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        location.reload();
      } else {
        console.log(error.message);
        Swal.fire({
          title: "Error",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {}
  };
  const cancelClick = (e) => {
    e.preventDefault();
    Swal.close();
  };
  return (
    <div className="flex justify-center items-center m-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center">
          <div className="flex items-center m-2">
            {showImg && (
              <div className="relative">
                <img
                  src={imageSrc}
                  className="h-64 w-64 object-cover mr-2 rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="w-64 ">
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
            <div className="flex flex-row items-center justify-around">
              {buttonDisabled ? (
                <button
                  className="flex justify-center relative px-4 py-2 bg-green-100 rounded-lg cursor-pointer border border-gray-300  text-mini-3 font-custom font-bold text-slate-300 text-center shadow-xl mt-2 transition"
                  disabled={buttonDisabled}
                >
                  Cambiar
                </button>
              ) : (
                <button className="flex justify-center relative px-4 py-2 bg-green-300 rounded-lg cursor-pointer border border-gray-300 hover:bg-green-500 focus:border-blue-500 focus:outline-none text-mini-3 font-custom font-bold text-white text-center hover:-translate-y-1 active:translate-y-1 shadow-xl mt-2 transition">
                  Cambiar
                </button>
              )}
              <button
                className="flex justify-center relative px-4 py-2 bg-red-300 rounded-lg cursor-pointer border border-gray-300 hover:bg-red-500 focus:border-blue-500 focus:outline-none text-mini-3 font-custom font-bold text-white text-center hover:-translate-y-1 active:translate-y-1 shadow-xl mt-2 transition"
                onClick={cancelClick}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImageUpdate;
