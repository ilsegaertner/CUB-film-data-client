import PropTypes from "prop-types";
import { useState } from "react";
import React from "react";
import { Card, Figure, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addFavouriteHandler } from "../favouriteHandler";
import { removeFavouriteHandler } from "../favouriteHandler";

import "./movie-card.scss";

export const MovieCard = ({
  movie,
  user,
  movieId,
  updateUser,
  token,
  setUserProfile,
}) => {
  console.log(movieId);

  const [showGenreDescription, setShowGenreDescription] = useState(false);
  const [showDirectorBio, setShowDirectorBio] = useState(false);

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

  const toggleDirectorBio = () => {
    setShowDirectorBio(!showDirectorBio);
  };

  return (
    <Card className="fav-movie">
      <Figure>
        <Link to={`/movies/${movie.title}`} style={{ textDecoration: "none" }}>
          <Figure.Image
            className="figure-img img-fluid rounded"
            variant="top"
            src={movie.image}
            key={movie.id}
          />
        </Link>
        <Card.Body>
          <>
            <Link
              to={`/movies/${movie.title}`}
              style={{ textDecoration: "none" }}
            >
              <Card.Title>
                {movie.title} ({movie.year})
              </Card.Title>{" "}
            </Link>
            <span
              // onClick={() => setShowDirectorBio(!showDirectorBio)}
              style={{ textDecoration: "none" }}
            >
              {movie.director}
            </span>{" "}
            <Button className="addButton" onClick={toggleFavourite}>
              {isMovieInFavourites
                ? "Remove from Favourites"
                : "Add to Favourites"}
            </Button>
          </>
        </Card.Body>
      </Figure>
    </Card>
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
