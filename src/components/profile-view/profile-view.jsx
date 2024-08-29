import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "./profile-view.scss";

import { UserInfo } from "./user-info";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateUser } from "./update-user";
import { DeleteProfile } from "./delete-profile";

export const ProfileView = ({
  token,
  movies,
  handleSubmit,
  userProfile,
  setUserProfile,
  onLoggedOut,
  user,
  updateUser,
}) => {
  // fetch userProfile and update it with setUserProfile
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
        setUserProfile({
          id: data._id,
          username: data.Username,
          email: data.Email,
          birthday: data.Birthday,
          favouriteMovies: data.FavouriteMovies || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, [token, user]);

  // Filters based on the user's favorite Movies array
  let favouriteMovieList = user.FavouriteMovies
    ? movies.filter((movie) => user.FavouriteMovies.includes(movie.id))
    : [];

  return (
    <Container className="profileContainer">
      <Row className="justify-content-lg-between">
        <Col xs={12} sm={12} lg={3}>
          <Card>
            <Card.Body className="profilecard1">
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={5}>
          <Card>
            <Card.Body className="profilecard2">
              <UpdateUser
                user={user}
                token={token}
                handleSubmit={handleSubmit}
                updateUser={updateUser}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={1} sm={12} lg={1}>
          <DeleteProfile user={user} onLoggedOut={onLoggedOut} token={token} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} lg={12}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <h2>Favorite Movies</h2>
                </Col>
              </Row>
              <Row>
                {favouriteMovieList.map((movie, id) => {
                  return (
                    <Col xs={12} md={6} lg={3} key={id} className="fav-movie">
                      <MovieCard
                        user={user}
                        setUserProfile={setUserProfile}
                        updateUser={updateUser}
                        movie={movie}
                        token={token}
                        movieId={movie.id}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
