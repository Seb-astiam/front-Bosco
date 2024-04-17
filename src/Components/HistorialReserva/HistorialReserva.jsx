import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Modal from "react-modal";
import axiosJwt from "../../utils/axiosJwt";

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Historial de Reservas</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Inicio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Fin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hora de Inicio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hora de Fin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estatus
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pago
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {historial.map((reserva) => (
            <tr key={reserva.id}>
              <td className="px-6 py-4 whitespace-nowrap">{reserva.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.fechaInicio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.fechaFin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.horaInicio}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{reserva.horaFin}</td>
              <td className="px-6 py-4 whitespace-nowrap">{reserva.estatus}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.Housings[0]?.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.Housings[0]?.price}
              </td>
              <td>
                <button
                  className={`py-2 px-4 rounded ${
                    reserva.estatus !== "Success"
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-red-500 text-white"
                  } ${
                    reserva.estatus === "Pending" ? "pointer-events-none" : ""
                  } transition-all duration-200`}
                  disabled={
                    loadingPreference ||
                    preferenceId !== null ||
                    reserva.estatus !== "Success"
                  }
                  onClick={() => createPreference(reserva.id)}
                  style={{
                    cursor:
                      reserva.estatus !== "Success" ? "not-allowed" : "pointer",
                  }}
                >
                  Pagar
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {reserva.Housings[0]?.provinces}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
