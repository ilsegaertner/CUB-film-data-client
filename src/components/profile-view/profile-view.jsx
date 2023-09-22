import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "./profile-view.scss";

import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { DeleteProfile } from "./delete-profile";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({
  token,
  movies,
  handleSubmit,
  onLoggedOut,
  user,
}) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (!user || !token) return;

    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setUserProfile({
          id: data._id,
          username: data.Username,
          email: data.Email,
          birthday: data.Birthday,
          favouriteMovies: data.FavouriteMovies,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, [token, user]);

  console.log(movies);

  if (userProfile && userProfile.favouriteMovies) {
    const favoriteMovieList = movies.filter((movie) =>
      userProfile.favouriteMovies.includes(movie._id)
    );
    console.log(favoriteMovieList);
  }

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
            user={userProfile}
            favoriteMovieList={movies}
            token={token}
            movies={movies}
          />
        </Col>
      </Row>
    </Container>
  );
};
