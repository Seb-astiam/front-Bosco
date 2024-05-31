import Modal from 'react-modal';

export const ModalAlojamiento = ({closeModal, modalIsOpen}) => {

    return (
        <Modal 
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className=""
        >
            <button onClick={closeModal}>close</button>


        </Modal>
    )
}