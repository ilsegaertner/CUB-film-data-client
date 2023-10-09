import PropTypes from "prop-types";
import { useState } from "react";
import React from "react";
import { Card, Figure, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AddFavorite } from "../view-favorites/add-favorite";
import { RemoveFavorite } from "../view-favorites/remove-favorite";
import "./movie-card.scss";
// import "./profile-view/profile-view.scss";

export const MovieCard = ({
  movie,
  user,
  favoriteMovieList,
  updateUser,
  token,
  title,
  setUserProfile,
  setFavoriteMovieList,
}) => {
  const [showGenreDescription, setShowGenreDescription] = useState(false);
  const [showDirectorBio, setShowDirectorBio] = useState(false);

  const toggleDirectorBio = () => {
    setShowDirectorBio(!showDirectorBio);
  };

  return (
    <Card className="fav-movie">
      <Figure>
        <Link to={`/movies/${movie.title}`} style={{ textDecoration: "none" }}>
          <Figure.Image
            className=""
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
            </span>
            {/* {showDirectorBio && (
              <div>
                <span>{movie.bio} </span>{" "}
              </div>
            )} */}
            {/* <Link to={`/movies/${movie.title}`}>
            <Button variant="link" style={{ textDecoration: "none" }}>
              Open
            </Button>
          </Link> */}{" "}
            {favoriteMovieList.some((favMovie) => favMovie.id === movie.id) ? (
              <RemoveFavorite
                movieId={movie.id}
                movie={movie}
                updateUser={updateUser}
                user={user}
                title={title}
                token={token}
                setUserProfile={setUserProfile}
                favoriteMovieList={favoriteMovieList}
                setFavoriteMovieList={setFavoriteMovieList}
              />
            ) : (
              <AddFavorite
                movieId={movie.id}
                movie={movie}
                updateUser={updateUser}
                user={user}
                title={title}
                token={token}
                setUserProfile={setUserProfile}
                favoriteMovieList={favoriteMovieList}
                setFavoriteMovieList={setFavoriteMovieList}
              />
            )}
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
