import { Button } from "react-bootstrap";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./favorites.scss";

export const AddFavorite = ({
  token,
  movieId,
  movie,
  setFavoriteMovieList,
  setUserProfile,
  user,
}) => {
  const showToast = () => {
    toast.info(
      <div>
        <span style={{ fontWeight: "bold" }}>{movie.title}</span> from{" "}
        <span style={{ fontWeight: "bold" }}>{movie.director}</span> added to
        your favorite list
      </div>
    );
  };
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const bothHandlers = () => {
    addFavoriteHandler();
  };

  const addFavoriteHandler = () => {
    const updatedFavouriteMovies = [...user.FavouriteMovies, movieId];
    setUserProfile({ ...user, FavouriteMovies: updatedFavouriteMovies });

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
          return response.json();
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
          setUserProfile(data);
          setFavoriteMovieList(updatedFavouriteMovies);
          showToast();
        }
        // alert(`${movie.title} from ${movie.director} added to favorites`);
      })
      .catch((error) => {
        console.error(`Error adding ${movie.title} to favorites`, error);
      });
  };
  return (
    <>
      <Button size="sm" onClick={bothHandlers} className="addButton">
        Add
      </Button>
      {/* <ToastContainer
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
        preventDuplicates={true}
      /> */}
    </>
  );
};
