import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";
import { UpdateUser } from "./update-user";

export const FavoriteMovies = ({ user, title, token, favoriteMovieList }) => {
  // const [userProfile, setUserProfile] = useState(null);
  // // const favoriteMovies = user.FavouriteMovies || [];

  console.log(user);
  console.log(title);

  const addHandler = (title) => {
    UpdateUser();
    addFavorite(title);
  };

  const removeHandler = (title) => {
    UpdateUser();
    removeFav(title);
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(({ image, title, id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${title}`}>
                    <Figure.Image src={image} alt={title} />
                    <Figure.Caption>{title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="secondary" onClick={() => addHandler(title)}>
                  Add
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => removeHandler(title)}
                >
                  Remove
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};
