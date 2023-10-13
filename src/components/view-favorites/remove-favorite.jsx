import { Button } from "react-bootstrap";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./favorites.scss";

export const RemoveFavorite = ({
  user,
  title,
  token,
  movieId,
  movie,
  setUserProfile,
  favoriteMovieList,
  setFavoriteMovieList,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const showToast = () => {
    toast.info(
      <div>
        <span style={{ fontWeight: "bold" }}>{movie.title}</span> from{" "}
        <span style={{ fontWeight: "bold" }}>{movie.director}</span> removed
        from your favorite list
      </div>
    );
  };

  const deleteFavoriteHandler = () => {
    const updatedFavoriteMovies = favoriteMovieList.filter(
      (favMovie) => favMovie.id !== movieId
    );

    setFavoriteMovieList(updatedFavoriteMovies);

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
          setUserProfile(updatedUser);
          showToast();

          // alert(`${movie.title} from ${movie.director} removed from favorites`);
        } else {
          throw new Error(`Failed to remove ${movie.title}`);
        }
      })
      .catch((error) => {
        console.error(`Failed to remove ${movie.title}`, error);
      });
  };

  return (
    <>
      <button
        size="sm"
        onClick={deleteFavoriteHandler}
        className="removeButton"
      >
        Remove
      </button>
      <ToastContainer
        position="top-center full width"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
        // toastId="005"
        limit={1}
      />
    </>
  );
};
