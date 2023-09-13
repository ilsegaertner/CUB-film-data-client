import React from "react";
import { Button, Card } from "react-bootstrap";

const DeleteProfile = ({ user, onLoggedOut, token }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  console.log(user);

  const deleteProfileHandler = () => {
    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          alert("Profile deleted");
          onLoggedOut();
          // window.location = "../signup";
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
        <Card.Body>
          <Button onClick={deleteProfileHandler}>Delete Profile</Button>
        </Card.Body>
      </Card>
    </>
  );
};
