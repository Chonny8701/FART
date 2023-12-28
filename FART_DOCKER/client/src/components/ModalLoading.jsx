import React from 'react';
import '../scss/components/ModalLoading.scss'

const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <article className={`modal-loading ${isOpen ? 'is-open' : ''}`} onClick={closeModal}>
      <div className="modal-loading-container" onClick={handleModalContainerClick}>
        {children}
      </div>
    </article>
  );
};

export default Modal;