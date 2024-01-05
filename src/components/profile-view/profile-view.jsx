import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "./profile-view.scss";

import { UserInfo } from "./user-info";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateUser } from "./update-user";
import { DeleteProfile } from "./delete-profile";
import { ViewFavorites } from "../view-favorites/view-favorites";

export const ProfileView = ({
  token,
  movies,
  handleSubmit,
  userProfile,
  setUserProfile,
  onLoggedOut,
  user,
  title,
  updateUser,
  movie,
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
        // setUserProfile(updateUser);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, [token, user]);

  // Filters based on the user's favorite Movies array
  let favouriteMovieList = user.FavouriteMovies
    ? movies.filter((movie) => user.FavouriteMovies.includes(movie.id))
    : [];
  console.log(user);
  console.log(movies);
  console.log(favouriteMovieList);
  //   const updatedFavoriteMovieList = movies.filter((movie) =>
  //   data.FavouriteMovies.includes(movie.id)
  // );
  // setFavoriteMovieList(updatedFavoriteMovieList);

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
        {/* <Col xs={1} sm={3} lg={2}>
          <Card>
            <Card.Body></Card.Body>
          </Card>
        </Col> */}
        <Col xs={12} sm={12} lg={12}>
          {/* <ViewFavorites
            favoriteMovieList={favoriteMovieList}
            token={token}
            movies={movies}
            user={user}
            title={title}
            movie={movie}
            setUserProfile={setUserProfile}
            setFavoriteMovieList={setFavoriteMovieList}
          /> */}

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
                        // updateUserFavorite={updateUserFavorite}
                        movie={movie}
                        token={token}
                        // setFavoriteMovieList={setFavoriteMovieList}
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
