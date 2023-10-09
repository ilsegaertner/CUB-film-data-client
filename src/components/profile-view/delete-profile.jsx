import React from "react";
import { Button, Card } from "react-bootstrap";
import "./profile-view.scss";

export const DeleteProfile = ({ user, onLoggedOut, token }) => {
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
      <Card>
        <Button onClick={deleteProfileHandler} className="deleteButton">
          Delete Profile
        </Button>
      </Card>
    </>
  );
};
