import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "../profile-view/profile-view.scss";
import { MovieCard } from "../movie-card/movie-card";

export const ViewFavorites = ({
  user,
  updateUserFavorite,
  setUserProfile,
  favoriteMovieList,
  movie,
  token,
  setFavoriteMovieList,
}) => {
  // const favoriteMovieList = movies.filter(
  //   (movie) =>
  //     userProfile.FavouriteMovies &&
  //     userProfile.FavouriteMovies.includes(movie.id)
  // );

  console.log("favoriteMovieList:", favoriteMovieList);
  console.log("movie:", movie);

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map((movie, id) => {
            return (
              <Col xs={12} md={6} lg={3} key={id} className="fav-movie">
                <MovieCard
                  user={user}
                  setUserProfile={setUserProfile}
                  favoriteMovieList={favoriteMovieList}
                  updateUserFavorite={updateUserFavorite}
                  movie={movie}
                  token={token}
                  setFavoriteMovieList={setFavoriteMovieList}
                />
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
