import React from "react";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, title, message, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        {title && <h3 className="modal__title">{title}</h3>}
        {message && <p className="modal__message">{message}</p>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
