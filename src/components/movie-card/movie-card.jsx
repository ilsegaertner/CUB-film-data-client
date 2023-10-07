import PropTypes from "prop-types";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AddFavorite } from "../view-favorites/add-favorite";
import { RemoveFavorite } from "../view-favorites/remove-favorite";
import "./movie-card.scss";

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
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} key={movie.id} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${movie.title}`}>
          {/* // the key property you use to populate the id contains non-alphanumeric characters that dont work well when used as URL params. encodeURIComponent is used to replace these non-alphanumeric characters with URL-friendly characters  */}
          <Button variant="link" style={{ textDecoration: "none" }}>
            Open
          </Button>
        </Link>

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
      </Card.Body>
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
