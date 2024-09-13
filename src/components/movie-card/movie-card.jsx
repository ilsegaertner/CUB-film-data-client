import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

// import { useUserContext } from "../../userContext";
import { useUserContext } from "../../UserContext";

import heart from "../../assets/heart.png";
import heartFilled from "../../assets/heart-filled.png";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  const { favouriteMovies, toggleFavourites } = useUserContext();
  console.log("toggleFavourites in MovieCard:", toggleFavourites);

  const [isMovieInFavourites, setIsMovieInFavourites] = useState(false);

  const context = useUserContext();
  console.log("Context in MovieCard:", context);

  useEffect(() => {
    if (favouriteMovies) {
      setIsMovieInFavourites(favouriteMovies.includes(movie.id));
    }
  }, [favouriteMovies, movie.id]);

  return (
    <>
      <div className="movie-card">
        <div className="movie-image-wrapper">
          <Link to={`/movies/${movie.title}`}>
            <img src={movie.image} className="movie-image" />
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
        <button
          className="addButton"
          onClick={() => {
            console.log("ToggledFavourites MovieId:", movie.id);
            toggleFavourites(movie.id);
          }}
        >
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
