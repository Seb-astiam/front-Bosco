import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Modal from "react-modal";
import axiosJwt from "../../utils/axiosJwt";
import ReviewForm from "../ReviewAndComents/ReviewForm";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
import { BsStarFill } from "react-icons/bs";

Modal.setAppElement("#root");

export const HistorialReserva = () => {
  const email_usuario = JSON.parse(localStorage.getItem("user"));
  const [historial, setHistorial] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  const [loadingPreference, setLoadingPreference] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [reviewStatuses, setReviewStatuses] = useState({});


  console.log(email_usuario, 'usuario ')

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const { data } = await axiosJwt(
          `/reservation/allReservation/${email_usuario.email}`
        );
        setHistorial(
          data.map((dataHousing) => ({
            id: dataHousing.id,
            fechaInicio: dataHousing.fechaInicio,
            fechaFin: dataHousing.fechaFin,
            horaInicio: dataHousing.horaInicio,
            horaFin: dataHousing.horaFin,
            estatus: dataHousing.estatus,
            estadoDePago: dataHousing.estadoDePago,
            Housings: dataHousing.Housings,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistorial();
  }, []);

  const createPreference = async (id) => {
    if (!loadingPreference) {
      setLoadingPreference(true);
      setSelectedReservationId(id);

      const reserv = historial.find((reserva) => reserva.id === id);

      try {
        const response = await axiosJwt.post(
          "/pagos/create_preference",
          {
            title: reserv.Housings[0]?.title,
            quantity: 1,
            unit_price: reserv.Housings[0]?.price,
          }
        );

        const { id } = response.data;
        localStorage.setItem("id_pago", reserv.id)

        setPreferenceId(id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPreference(false);
        setModalIsOpen(true);
      }
    }
  };

  initMercadoPago("TEST-24c1c24d-a669-4793-9e95-a44f9e2152ba", {
    locale: "es-AR",
  });

  const closeModal = () => {
    setModalIsOpen(false);
    setPreferenceId(null);
  };

  
  const [selectedReviewReservationId, setSelectedReviewReservationId] = useState(null);
  const openPopup = (e) => {
    const { value } = e.target;
    const reserva = historial.find((reserva) => {
      return reserva.id == value
    });

    if (!reserva) {
      Swal.fire("No se encontro la reserva");
    }
  
    if (reserva.estatus === 'Pending') {
      Swal.fire("Tu reserva aún está pendiente, no puedes reseñar");
    } else if (reserva.estatus === 'Reject') {
      Swal.fire("Tu reserva fue rechazada, no puedes reseñar");
    } else {
      setSelectedReviewReservationId(value);
    }
  };

  const closePopup = () => {
    setSelectedReviewReservationId(null);
  };


  const [openReservas, setOpenReservas] = useState({});

  const toggleDropdown = (reservaId) => {
    setOpenReservas({
      ...openReservas,
      [reservaId]: !openReservas[reservaId] 
    });
  };

  useEffect(() => {
    const initialOpenReservas = historial.reduce((acc, reserva) => {
      return { ...acc, [historial.id]: false };
    }, {});
    
    setOpenReservas(initialOpenReservas);
  }, [historial]);

  const calcularValorEstadia = (reserva) => {
    const precioPorEstadia = reserva.Housings[0]?.price; 
  
    if (reserva.horaInicio !== null) {
      const horasInicio = reserva.horaInicio; 
      const horasFin = reserva.horaFin 
  
      const horasEstadia = horasFin - horasInicio; 
  
      return precioPorEstadia * horasEstadia; 
    } else {
      const fechaInicio = new Date(reserva.fechaInicio);
      const fechaFin = new Date(reserva.fechaFin);
  
      const diferenciaDias = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24); 
  
      return precioPorEstadia * diferenciaDias; 
    }
  };

 
  const tieneComentario = async (idReserva) => {
    try {
      const { data } = await axios(`/review/allReview/${idReserva}`);
      setReviewStatuses((prevStatuses) => ({
        ...prevStatuses,
        [idReserva]: data[0] || null,
      }));
    } catch (error) {
      console.error('Error fetching review:', error);
      setReviewStatuses((prevStatuses) => ({
        ...prevStatuses,
        [idReserva]: null,
      }));
    }
  };

  useEffect(() => {
    historial.forEach((reserva) => {
      tieneComentario(reserva.id);
    });
  }, [historial]);

  return (

  <div className="mt-2 mq900:mt-4 w-full">
  <a className="font-custom ml-3 text-chocolate-200 font-bold mq900:text-[25px]  text-[35px]">Historial de Reservas</a>
  <div className="w-full font-custom flex flex-col m-[10px]">
    <div className="w-[95%] flex justify-evenly items-center">
      <a className="mq900:hidden w-[15%] px-4 py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
        Check-in
      </a>
      <a className="mq900:hidden w-[15%] px-4 py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
        Check-out
      </a>
      <a className=" px-4 mq900:px-2 py-2 w-[10%] mq900:w-[20%] text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
        Estado
      </a>
      <a className="px-4 mq900:px-2 py-2 w-[15%] mq900:w-[27%]  text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
        Alojamiento
      </a>
      <a className="px-4 py-2 mq900:px-2 w-[15%] mq900:w-[48%] text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px] mq900:mr-8">
        Subtotal
      </a>
      <a className="mq900:hidden px-4 w-[10%] py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
        Ubicación
      </a>
      <a className="mq900:hidden px-4 w-[20%] py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
        Reseñas
      </a>
    </div>
    <div className="flex flex-col my-3 text-gray-700 w-[95%]">
      {historial.map((reserva) => (
        <div key={reserva.id} className="flex flex-col h-[100px]  bg-slate-200 border border-black border-solid ">
          <div className="flex flex-row items-center text-start">
            <a className="mq900:hidden px-2 py-4 w-[15%]">
              {reserva.horaInicio !== null
                ? `${reserva.fechaInicio}, ${reserva.horaInicio}hs`
                : `${reserva.fechaInicio}`}
            </a>
            <a className="mq900:hidden px-2 py-4 w-[15%]">
              {reserva.horaFin !== null
                ? `${reserva.fechaInicio}, ${reserva.horaFin}hs`
                : `${reserva.fechaFin}`}
            </a>
            <a
              className={`px-2 py-4 mq900:w-[20%] w-[12%] mq900:text-[14px] mq900:px-0 mq900:ml-1 ${
                reserva.estatus === "Pending"
                  ? "text-yellow-500"
                  : reserva.estatus === "Success"
                  ? "text-green-500"
                  : reserva.estatus === "Reject"
                  ? "text-red-500"
                  : ""
              }`}
            >
              {reserva.estatus}
            </a>
            <a className="px-2 py-4 mq900:w-[27%] w-[15%] mq900:text-[14px] mq900:px-0 mq900:ml-1">
              <Link to={`/detail/${reserva.Housings[0]?.id}`} className='no-underline hover:underline'>
              {reserva.Housings[0]?.title}
              </Link>
            </a>
            <a className="px-2 py-4 mq900:w-[43%] w-[15%] flex flex-row items-center justify-start mq900:text-[14px] mq900:px-0 mq900:ml-1">
              {`${calcularValorEstadia(reserva)},00  ` }
             {!reserva.estadoDePago ? <button
                className={`py-2 px-4 rounded-[20px] w-[50%] ml-5 mq900:ml-3 ${
                  reserva.estatus !== "Success"
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-chocolate-100 text-white hover:bg-chocolate-200"
                } ${
                  reserva.estatus === "Pending"
                    ? "pointer-events-none"
                    : ""
                } transition-all duration-200`}
                disabled={
                  loadingPreference ||
                  preferenceId !== null ||
                  reserva.estatus !== "Success"
                }
                onClick={() => createPreference(reserva.id)}
              >
                Pagar
              </button> :
              <button
                className={`py-2 px-4 rounded-[20px] w-[50%] ml-5 mq900:ml-3 bg-green-400 text-white cursor-not-allowed`} 
              >Pagado</button>
              }
            </a>
            <a
              className="mq900:block mq1300:hidden mq1650:hidden"
              onClick={() => toggleDropdown(reserva.id)}
            >
              {openReservas[reserva.id] ? `↓` : `↑`}
            </a>
            <a className="mq900:hidden px-2 py-4 w-[10%]">
              {reserva.Housings[0]?.provinces}
            </a>
            <a className="mq900:hidden px-2 py-4 w-[20%]">

            <div>
                {reviewStatuses[reserva.id] ? (
                  <div>

                    <p>{reviewStatuses[reserva.id].comentario}</p>
                    {[...Array(reviewStatuses[reserva.id].valoracion)].map((_, index) => (
                      <BsStarFill
                        key={index}
                        className="text-yellow-500"
                        style={{ fontSize: "24px" }}
                      />
                    ))}
                  </div>
                ) : (
                  <>
                    <button
                      value={reserva.id}
                      onClick={(e) => openPopup(e)}
                      className={`py-2 px-4 rounded-[20px] w-[50%] ml-5 mq900:ml-3 text-black ${
                        reserva.estatus !== "Success" ? 'bg-gray-400' : 'bg-yellow-400'
                      }`}
                    >
                      Calificar
                    </button>
                    {selectedReviewReservationId === reserva.id && (
                      <div className="ventana-popup">
                        <div className="contenido-popup">
                          <ReviewForm idReserva={reserva.id} />
                          <button onClick={closePopup}>Cerrar</button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </a>
          </div>
          {openReservas[reserva.id] && (
            <div className="py-1 flex nowrap w-full">
              <div className="flex flex-col">
                <a className="px-4 py-2 text-left font-medium text-cantaloupe">
                  Check-In
                </a>
                <a className="px-4 py-2 text-left font-medium text-cantaloupe">
                  Check-out
                </a>
                <a className="px-4 py-2 text-left font-medium text-cantaloupe">
                  Ubicación
                </a>
              </div>
              <div className="flex flex-col">
                <a className="px-4 py-2 hover:bg-gray-100">
                  {reserva.horaInicio !== null
                    ? `${reserva.fechaInicio}, ${reserva.horaInicio}hs`
                    : `${reserva.fechaInicio}`}
                </a>
                <a className="px-4 py-2 hover:bg-gray-100">
                  {reserva.horaFin !== null
                    ? `${reserva.fechaInicio}, ${reserva.horaFin}hs`
                    : `${reserva.fechaFin}`}
                </a>
                <a className="px-4 py-2 hover:bg-gray-100">
                  {reserva.Housings[0]?.provinces}
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Pagar Reserva"
    style={{
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      },
      content: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "8px",
        maxWidth: "80%",
        maxHeight: "80%",
        overflow: "auto",
      },
    }}
  >
    <h2>Pagar reserva</h2>
    {preferenceId ? (
      <Wallet
        initialization={{ preferenceId: preferenceId }}
        customization={{ texts: { valueProp: "smart_option" } }}
      />
    ) : (
      <p>Creando preferencia de pago...</p>
    )}
    <button
      onClick={closeModal}
      className="block mx-auto mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
      style={{ cursor: "pointer" }}
    >
      Cancelar
    </button>
  </Modal>
</div>
);
};
