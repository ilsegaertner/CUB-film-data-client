import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";

export const ProfileView = ({
  movies,
  token,
  user,
  favoriteMovieList,
  handleSubmit,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  // const [user, setUser] = useState(
  //   storedUser ? storedUser : { Username: "", mail: "", FavoriteMovies: [] }
  // );

  // const [user, setUser] = useState(storedUser ? storedUser : null);
  // const [user, setUser] = useState({
  //   Username: "",
  //   mail: "",
  //   FavoriteMovies: [],
  // });

  // const favoriteMovieList = movies.filter((movies) =>
  //   user.FavoriteMovies.includes(movies._id)
  // );

  // const getUser = () => {
  useEffect(() => {
    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const user = data.map((user) => {
          return {
            id: user.id,
            username: user.Username,
            email: user.Email,
            favoriteMovies: user.FavoriteMovies,
          };
        });

        setUser(user);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, []);

  // const handleUpdate = (e) => {
  //   e.preventDefault();

  //   const data = {
  //     Username: user.Username,
  //     Password: user.Password,
  //     Email: user.Email,
  //     Birthday: user.Birthday,
  //     FavoriteMovies: user.FavoriteMovies,
  //   };

  //   fetch(
  //     `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   )
  //     .then((resolve) => {
  //       if (resolve.ok) {
  //         alert("Updated profile successfully. Please login again.");
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("user");
  //         window.location = "/login";
  //       } else {
  //         alert("Update failed");
  //       }
  //     })
  //     .catch((error) => alert("Update failed" + error));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const data = {
  //     Username: username,
  //     Password: password,
  //     Email: email,
  //     Birthday: birthday,
  //     FavoriteMovies: favoriteMovies,
  //   };

  //   if (!user.Username || !user.Email) {
  //     alert("Username and Email are required.");
  //     return;
  //   }

  //   fetch(
  //     `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   )
  //     .then((response) => {
  //       if (response.ok) {
  //         alert("Form submitted successfully.");
  //         window.location = "/";
  //       } else {
  //         alert("Form submission failed.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting form", error);
  //       alert("Form submission failed.");
  //     });
  // };

  // const removeFav = (id) => {};

  // useEffect(() => {
  //   let isMounted = true;
  //   isMounted && getUser();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} sm={12}>
          <Card>
            <Card.Body>
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12}>
          <Card>
            <Card.Body>
              <UpdateUser
                handleSubmit={handleSubmit}
                user={user}
                token={token}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  );
};
