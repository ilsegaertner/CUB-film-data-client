//add Favorite

import { Button } from "react-bootstrap";

export const AddFavorite = ({ updateUser, user, movie, token }) => {
  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");

  const bothHandlers = () => {
    updateUser();
    addFavoriteHandler();
  };

  const addFavoriteHandler = () => {
    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movie.title}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Movie added to favorites");
        } else {
          throw new Error("Failed to add movie to favorites");
        }
      })
      .catch((error) => {
        console.error("Error adding movie to favorites", error);
      });
  };
  return (
    <Button size="sm" onClick={bothHandlers}>
      Add
    </Button>
  );
};
