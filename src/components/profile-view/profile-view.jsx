import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "./profile-view.scss";

import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { DeleteProfile } from "./delete-profile";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({
  token,
  user,
  movies,
  handleSubmit,
  onLoggedOut,
}) => {
  // const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");

  // useEffect(() => {
  //   fetch(
  //     `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const user = data.map((user) => {
  //         return {
  //           id: user.id,
  //           username: user.Username,
  //           email: user.Email,
  //           favoriteMovies: user.FavoriteMovies,
  //         };
  //       });

  //       setUser(user);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data", error);
  //     });
  // }, []);

  // Filter movies based on user's favoriteMovies
  // const favoriteMovieList = movies.filter((movie) =>
  //   user.FavouriteMovies.includes(movie._id)
  // );

  // const favoriteMovieList = [];

  console.log(user);

  if (user.FavouriteMovies) {
    const favoriteMovieList = movies.filter((movie) =>
      user.FavouriteMovies.includes(movie._id)
    );
  }

  console.log(user);
  console.log(movies);
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} lg={12}>
          <Card>
            <Card.Body className="profilecard1">
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12}>
          <Card>
            <Card.Body className="profilecard2">
              <UpdateUser
                handleSubmit={handleSubmit}
                user={user}
                token={token}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12}>
          <Card>
            <Card.Body>
              <DeleteProfile
                user={user}
                onLoggedOut={onLoggedOut}
                token={token}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12}>
          <FavoriteMovies
            user={user}
            favoriteMovieList={movies}
            token={token}
            movies={movies}
          />
        </Col>
      </Row>
    </Container>
  );
};
