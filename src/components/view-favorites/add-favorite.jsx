//add Favorite

import { useState } from "react";
import { Button } from "react-bootstrap";

export const AddFavorite = ({
  token,
  movieId,
  movie,
  setFavoriteMovieList,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  const [user, setUserProfile] = useState(storedUser || null); //added logic for persisting a Login Session

  const bothHandlers = () => {
    addFavoriteHandler();
  };

  const addFavoriteHandler = () => {
    const updatedFavouriteMovies = [...user.FavouriteMovies, movieId]; // If the movie was added successfully, update the local state
    // and user's FavouriteMovies array
    setUserProfile({ ...user, FavouriteMovies: updatedFavouriteMovies });

    // console.log("Movie ID passed to AddFavorite:", movieId);

    setFavoriteMovieList(updatedFavouriteMovies);

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
          return response.json(); //parse the response
        } else {
          return response.text().then((errorMessage) => {
            throw new Error(
              `Failed to add ${movie.title} to favorites: ${errorMessage}`
            );
          });
        }
      })
      .then((data) => {
        if (data) {
          // Update the user state with the received data
          setUserProfile(data); // Assuming the data contains the updated user profile
          setFavoriteMovieList(updatedFavouriteMovies);
          // console.log("Updated User Data:", data);
        }
        // console.log("API Response:", data); // Log the response data
        // If needed, update the local state or user's FavouriteMovies array
        // ...
        alert(`${movie.title} from ${movie.director} added to favorites`);
      })
      .catch((error) => {
        console.error(`Error adding ${movie.title} to favorites`, error);
      });
  };
  // console.log(user);
  return (
    <Button size="sm" onClick={bothHandlers}>
      Add
    </Button>
  );
};
