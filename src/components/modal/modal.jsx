import React from "react";
import "./modal.scss";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="modal">
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-button">
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
