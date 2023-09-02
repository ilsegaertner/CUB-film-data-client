import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

export const ProfileView = ({ movies }) => {
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    FavoriteMovies: [],
  });

  const favouriteMovieList = movies.filter((movies) =>
    user.FavoriteMovies.includes(movies._id)
  );

  const getUser = () => {};
  const handleSubmit = (e) => {};
  const handleUpdate = (e) => {};
  const removeFav = (id) => {};

  useEffect(() => {
    let isMounted = true;
    isMounted && getUser();
    return () => {
      isMounted = false;
    };
  }, []); // Passing an empty dependency array ([]) as a second argument to useEffect() telles React that your callback doesn't depend on any value changes in props or state, so it never needs to rerun(Equivalent to the componentDidMount() method)

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies favoriteMovieList={favouriteMovieList} />
    </Container>
  );
};
