import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Button, Card, Modal } from "react-bootstrap";
import "./profile-view.scss";

import Modal from "../modal/modal";
import { AnimatePresence } from "framer-motion";

import { useUserContext } from "../../userContext";

export const DeleteProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { user, token, logout } = useUserContext();

  // const handleClose = () => setShowModal(false);

  const deleteProfileHandler = () => {
    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          alert("Profile deleted");
          // window.location = "signup";
          logout();
          navigate("/signup");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
        alert("Something went wrong" + error.message);
      });
  };

  return (
    <>
      <div className="delete-action">
        <button onClick={() => setShowModal(true)} className="deleteButton">
          Delete Profile
        </button>

        <AnimatePresence>
          {showModal && (
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              {" "}
              <h3>Are you sure you want to delete your profile?</h3>
              <h6>! This action cannot be undone</h6>
              <div className="modal-actions">
                <button
                  className="modal-button-decline"
                  onClick={() => setShowModal(false)}
                >
                  No, bring me back
                </button>
                <button
                  className="modal-button-destructive"
                  onClick={deleteProfileHandler}
                >
                  Delete Profile
                </button>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        <hr />
      </div>
    </>
  );
};
