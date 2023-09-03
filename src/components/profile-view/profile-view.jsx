import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./profile-view.scss";
import { UserInfo } from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

export const ProfileView = ({ movies, token }) => {
  // const [user, setUser] = useState(storedUser ? storedUser : null);
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    FavoriteMovies: [],
  });

  const favoriteMovieList = movies.filter((movies) =>
    user.FavoriteMovies.includes(movies._id)
  );

  const getUser = () => {
    fetch(
      "https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/`${user.Username}`",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const userData = data.map((user) => {
          return {
            id: data.id,
            username: data.Username,
            email: data.Email,
            favoriteMovies: data.FavoriteMovies,
          };
        });

        setUser(userData);
      });
  };

  // const getUser = () => {};
  const handleSubmit = (e) => {};
  const handleUpdate = (e) => {};
  const removeFav = (id) => {};

  useEffect(() => {
    let isMounted = true;
    isMounted && getUser();
    return () => {
      isMounted = false;
    };
  }, []);

  console.log(user);

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo user={user} />
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
      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  );
};
