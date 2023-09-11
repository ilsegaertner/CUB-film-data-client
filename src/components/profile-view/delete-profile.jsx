import React from "react";
import { Button } from "react-bootstrap";

const DeleteProfile = ({ user, onLoggedOut, token }) => {
  const storedToken = localStorage.getItem("token");

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
      .catch((error) => alert("Something went wrong" + error));
  };

  return (
    <>
      <Button onClick={deleteProfileHandler}>Delete Profile</Button>
    </>
  );
};
