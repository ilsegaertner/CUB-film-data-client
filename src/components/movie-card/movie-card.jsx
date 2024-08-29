import PropTypes from "prop-types";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { addFavouriteHandler } from "../favouriteHandler";
import { removeFavouriteHandler } from "../favouriteHandler";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, movieId, updateUser, token }) => {
  console.log(movieId);

  const [isMovieInFavourites, setIsMovieInFavourites] = useState(
    user.FavouriteMovies.includes(movieId)
  );

  const toggleFavourite = () => {
    if (isMovieInFavourites) {
      removeFavouriteHandler(movieId, user, token, updateUser);
    } else {
      addFavouriteHandler(movieId, user, token, updateUser);
    }
    setIsMovieInFavourites(!isMovieInFavourites); // Toggle the local state
  };

  return (
    <>
      <div className="movie-card">
        {/* <div className="movie-image-wrapper"> */}
        <Link to={`/movies/${movie.title}`}>
          <img src={movie.image} key={movie.id} className="movie-image" />
        </Link>
        {/* </div> */}
        <Link to={`/movies/${movie.title}`}>
          <div className="movie-title">
            {movie.title} ({movie.year})
          </div>
          <span>{movie.director}</span>{" "}
        </Link>
        <div className="movie-content">
          <button className="addButton" onClick={toggleFavourite}>
            {isMovieInFavourites
              ? "Remove from Favourites"
              : "Add to Favourites"}
          </button>
        </div>
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
