import Modal from 'react-modal';

export const ModalAlojamiento = ({openModal, closeModal, modalIsOpen}) => {

    return (
        <Modal 
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        >

            <button onClick={closeModal}>close</button>
        </Modal>
    )
}