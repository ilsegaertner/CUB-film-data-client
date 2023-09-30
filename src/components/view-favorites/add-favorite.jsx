//add Favorite

import { useState } from "react";
import { Button } from "react-bootstrap";

export const AddFavorite = ({ updateUser, movie, token, movieId }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null); //added logic for persisting a Login Session

  console.log(user);
  console.log(storedUser);
  console.log(movie);

  const bothHandlers = () => {
    updateUser();
    addFavoriteHandler();
  };

  const addFavoriteHandler = () => {
    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`,
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
          // return response.json();
          // If the movie was added successfully, update the local state
          // and user's FavouriteMovies array
          const updatedFavouriteMovies = [...user.FavouriteMovies, movieId];
          setUser({ ...user, FavouriteMovies: updatedFavouriteMovies });
          alert("Movie added to favorites");
        } else {
          return response.text().then((errorMessage) => {
            throw new Error(
              `Failed to add movie to favorites: ${errorMessage}`
            );
          });
        }
      })
      .then((data) => {
        console.log("API Response:", data); // Log the response data
        // If needed, update the local state or user's FavouriteMovies array
        // ...
        alert("Movie added to favorites");
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
