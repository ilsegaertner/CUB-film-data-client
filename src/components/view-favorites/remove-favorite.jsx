//remove Favorite
import { useState } from "react";
import { Button } from "react-bootstrap";

export const RemoveFavorite = ({
  user,
  title,
  token,
  movieId,
  setUserProfile,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // const bothHandlers = () => {
  //   // updateUser();
  //   deleteFavoriteHandler();
  // };

  const deleteFavoriteHandler = () => {
    // Make a delete request to the API
    const url = `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Update the user state locally to reflect the removal of the favorite movie
          const updatedFavouriteMovies = user.FavouriteMovies.filter(
            (movieId) => movieId !== title
          );
          const updatedUser = {
            ...user,
            FavouriteMovies: updatedFavouriteMovies,
          };
          setUserProfile(updatedUser); // You'll need to declare and use setUser to update the user state

          alert("Movie removed from favorites");
        } else {
          throw new Error("Failed to remove favorite movie");
        }
      })
      .catch((error) => {
        console.error("Error removing favorite movie", error);
      });
  };

  return (
    <Button size="sm" onClick={deleteFavoriteHandler}>
      Remove
    </Button>
  );
};
