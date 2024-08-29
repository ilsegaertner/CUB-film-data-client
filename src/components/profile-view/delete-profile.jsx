import React from "react";
import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import "./profile-view.scss";

export const DeleteProfile = ({ user, onLoggedOut, token }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProfileHandler = () => {
    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          alert("Profile deleted");
          window.location = "signup";
          onLoggedOut();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
        alert("Something went wrong" + error);
      });
  };

  return (
    <>
      <div className="delete-action">
        <Button variant="primary" onClick={handleShow} className="deleteButton">
          Delete Profile
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your profile?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No, bring me back
            </Button>
            <Button variant="primary" onClick={deleteProfileHandler}>
              Delete Profile{" "}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
