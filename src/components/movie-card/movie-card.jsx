import PropTypes from "prop-types";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { addFavouriteHandler } from "../favouriteHandler";
import { removeFavouriteHandler } from "../favouriteHandler";
import { useUserContext } from "../../userContext";

import heart from "../../assets/heart.png";
import heartFilled from "../../assets/heart-filled.png";

import "./movie-card.scss";

export const MovieCard = ({ movie, movieId, updateUser, token }) => {
  const { user, favouriteMovies, setFavouriteMovies } = useUserContext();
  const isMovieInFavourites = favouriteMovies.includes(movieId);

  const toggleFavourite = async () => {
    if (isMovieInFavourites) {
      const updatedUser = await removeFavouriteHandler(movieId, user, token);
      setFavouriteMovies(updatedUser.FavouriteMovies);
      updateUser(updatedUser);
    } else {
      const updatedUser = await addFavouriteHandler(movieId, user, token);
      setFavouriteMovies(updatedUser.FavouriteMovies);
      updateUser(updatedUser);
    }
  };

  return (
    <>
      <div className="movie-card">
        <div className="movie-image-wrapper">
          <Link to={`/movies/${movie.title}`}>
            <img src={movie.image} key={movie.id} className="movie-image" />
          </Link>
        </div>

        <div className="movie-content">
          <Link to={`/movies/${movie.title}`}>
            <div className="movie-title">
              {movie.title} ({movie.year})
            </div>
          </Link>
          <span>{movie.director}</span>{" "}
        </div>
        <button className="addButton" onClick={toggleFavourite}>
          {/* {isMovieInFavourites ? "Remove from Favourites" : "Add to Favourites"} */}
          {isMovieInFavourites ? (
            <img src={heartFilled} width={20} />
          ) : (
            <img src={heart} width={20} />
          )}
        </button>
      </div>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    genreDescription: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    year: PropTypes.string,
    actors: PropTypes.array,
  }).isRequired,
};
