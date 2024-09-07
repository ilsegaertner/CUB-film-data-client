import React from "react";
import "./modal.scss";
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* Modal Content */}
      <motion.div
        className="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-button modal-button-back">
            x
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
