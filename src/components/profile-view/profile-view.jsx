import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "./profile-view.scss";

import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { DeleteProfile } from "./delete-profile";
import { ViewFavorites } from "../view-favorites/view-favorites";

export const ProfileView = ({
  token,
  movies,
  handleSubmit,
  onLoggedOut,
  user,
  title,
  updateUser,
  movie,
}) => {
  const [userData, setUserData] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);

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
        // console.log("API Response:", data);

        setUserData(data);

        setUserProfile({
          id: data._id,
          username: data.Username,
          email: data.Email,
          birthday: data.Birthday,
          favouriteMovies: data.FavouriteMovies,
        });

        // console.log("Updated userProfile:", userProfile);

        // console.log(user);

        const updatedFavoriteMovieList = movies.filter((movie) =>
          data.FavouriteMovies.includes(movie.id)
        );
        setFavoriteMovieList(updatedFavoriteMovieList);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });

    // if (user && user.favouriteMovies) {
    //   const favoriteMovieList = movies.filter((movie) =>
    //     user.favouriteMovies.includes(movie.id)
    //   );
    //   console.log(favoriteMovieList);
    // } else {
    //   console.log("userProfile or userProfile.favouriteMovies is undefined");
    // }
  }, [token, user, movies]);

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
                updateUser={updateUser}
                setUserProfile={setUserProfile}
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
          <ViewFavorites
            favoriteMovieList={favoriteMovieList}
            token={token}
            movies={movies}
            user={user}
            title={title}
            movie={movie}
            setUserProfile={setUserProfile}
            setFavoriteMovieList={setFavoriteMovieList}
          />
        </Col>
      </Row>
    </Container>
  );
};
