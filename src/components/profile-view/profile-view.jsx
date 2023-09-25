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
  const [userProfile, setUserProfile] = useState({});
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);

  console.log(user);

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
      .then((movie) => {
        console.log("API Response:", movie);
        setUserProfile({
          id: movie._id,
          username: movie.Username,
          email: movie.Email,
          birthday: movie.Birthday,
          favouriteMovies: movie.FavouriteMovies,
        });

        if (movie.FavouriteMovies) {
          const newFavoriteMovieList = movies.filter(
            (movie) =>
              movie.FavouriteMovies && movie.FavouriteMovies.includes(movie._id)
          );
          setFavoriteMovieList(newFavoriteMovieList);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, [token, user]);

  console.log(movies);
  console.log(userProfile);
  console.log(favoriteMovieList);

  // if (userProfile && userProfile.favouriteMovies) {
  //   const favoriteMovieList = movies.filter((movie) =>
  //     userProfile.favouriteMovies.includes(movie._id)
  //   );
  //   console.log(favoriteMovieList);

  return (
    <Container>
      <Row>
        <Col xs={12} sm={9} lg={5}>
          <Card>
            <Card.Body className="profilecard1">
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={5}>
          <Card>
            <Card.Body className="profilecard2">
              <UpdateUser
                handleSubmit={handleSubmit}
                user={user}
                token={token}
                userProfile={userProfile}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={1} sm={3} lg={2}>
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
        <Col xs={12} sm={12} lg={12}>
          <FavoriteMovies
            userProfile={userProfile}
            favoriteMovieList={favoriteMovieList}
            token={token}
          />
        </Col>
      </Row>
    </Container>
  );
};
