import { useState, useEffect } from "react";
// import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Modal from "react-modal";
import axiosJwt from "../../utils/axiosJwt";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export const HistorialReserva = () => {
  const email_usuario = JSON.parse(localStorage.getItem("user"));
  const [historial, setHistorial] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  const [loadingPreference, setLoadingPreference] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const { data } = await axiosJwt(
          `http://localhost:3001/reservation/allReservation/${email_usuario.email}`
        );
        setHistorial(
          data.map((dataHousing) => ({
            id: dataHousing.id,
            fechaInicio: dataHousing.fechaInicio,
            fechaFin: dataHousing.fechaFin,
            horaInicio: dataHousing.horaInicio,
            horaFin: dataHousing.horaFin,
            estatus: dataHousing.estatus,
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
          "http://localhost:3001/pagos/create_preference",
          {
            title: reserv.Housings[0]?.title,
            quantity: 1,
            unit_price: reserv.Housings[0]?.price,
          }
        );

        const { id } = response.data;
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
    const precioPorEstadia = reserva.Housings[0]?.price; // Precio por estadía (en días o en horas según corresponda)
  
    if (reserva.horaInicio !== null) {
      // Si hay hora de inicio definida, calcular el costo en base a horas
      const horasInicio = reserva.horaInicio; // Hora de inicio (ej. 8 para las 8:00 AM)
      const horasFin = reserva.horaFin // Hora de fin (24 si no está definida, final del día)
  
      const horasEstadia = horasFin - horasInicio; // Duración en horas de la estadía
  
      return precioPorEstadia * horasEstadia; // Precio por hora multiplicado por las horas de estadía
    } else {
      // Si no hay hora de inicio definida, calcular el costo en base a días
      const fechaInicio = new Date(reserva.fechaInicio);
      const fechaFin = new Date(reserva.fechaFin);
  
      const diferenciaDias = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24); // Diferencia en días
  
      return precioPorEstadia * diferenciaDias; // Precio por estadía multiplicado por los días de estadía
    }
  };

  return (

  <div className="mt-2 mq900:mt-4">
  <a className="font-custom ml-3 text-chocolate-200 font-bold mq900:text-[25px]  text-[35px]">Historial de Reservas</a>
  <div className="w-full font-custom flex flex-col m-[10px]">
    <div className="w-[95%] flex justify-evenly items-center">
      <a className="mq900:hidden w-[20%] px-4 py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
        Check-in
      </a>
      <a className="mq900:hidden w-[20%] px-4 py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
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
      <a className="mq900:hidden px-4 w-[15%] py-2 text-left font-medium text-cantaloupe border-cantaloupe border-solid border-2 rounded-[20px]">
        Ubicación
      </a>
    </div>
    <div className="flex flex-col my-3 text-gray-700 w-[95%]">
      {historial.map((reserva) => (
        <div key={reserva.id} className="flex flex-col">
          <div className="flex flex-row items-center text-start">
            <a className="mq900:hidden px-2 py-4 w-[20%]">
              {reserva.horaInicio !== null
                ? `${reserva.fechaInicio}, ${reserva.horaInicio}hs`
                : `${reserva.fechaInicio}`}
            </a>
            <a className="mq900:hidden px-2 py-4 w-[20%]">
              {reserva.horaFin !== null
                ? `${reserva.fechaInicio}, ${reserva.horaFin}hs`
                : `${reserva.fechaFin}`}
            </a>
            <a
              className={`px-2 py-4 mq900:w-[20%] w-[10%] mq900:text-[14px] mq900:px-0 mq900:ml-1 ${
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
              <Link to={`/detail/${reserva.id}`} className='no-underline hover:underline'>
              {reserva.Housings[0]?.title}
              </Link>
            </a>
            <a className="px-2 py-4 mq900:w-[43%] flex flex-row items-center justify-start mq900:text-[14px] mq900:px-0 mq900:ml-1">
              {`$${calcularValorEstadia(reserva)},00  ` }
              <button
                className={`py-2 px-4 rounded-[20px] ml-5 mq900:ml-3 ${
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
              </button>
            </a>
            <a
              className="mq900:block mq1300:hidden mq1650:hidden"
              onClick={() => toggleDropdown(reserva.id)}
            >
              {openReservas[reserva.id] ? `↓` : `↑`}
            </a>
            <a className="mq900:hidden px-2 py-4 w-[15%]">
              {reserva.Housings[0]?.provinces}
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
