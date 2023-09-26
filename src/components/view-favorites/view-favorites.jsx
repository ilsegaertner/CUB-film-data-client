import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "../profile-view/profile-view.scss";
import { MovieCard } from "../movie-card/movie-card";

export const ViewFavorites = ({ user, movies, movie, updateUser }) => {
  const FavoriteMovieList = movies.filter(
    (movie) =>
      movie.FavouriteMovies && movie.FavouriteMovies.includes(movie._id)
  );

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {FavoriteMovieList.map(({ image, title, id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={id} className="fav-movie">
                <MovieCard movie={movie} user={user} updateUser={updateUser} />
                {/* <Figure>
                  <Link to={`/movies/${title}`}>
                    <Figure.Image src={image} alt={title} />
                    <Figure.Caption>{title}</Figure.Caption>
                  </Link>
                </Figure> */}
                {/* <Button variant="secondary" onClick={() => addHandler(title)}>
                  Add
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => removeHandler(title)}
                >
                  Remove
                </Button> */}
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};
