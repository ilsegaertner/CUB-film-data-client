import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";
import { UpdateUser } from "./update-user";

export const FavoriteMovies = ({ user, title, token, favoriteMovieList }) => {
  // const [userProfile, setUserProfile] = useState(null);
  // // const favoriteMovies = user.FavouriteMovies || [];

  // //getUser
  // useEffect(() => {
  //   fetchUserData();
  // }, [user.Username, token]);

  // const fetchUserData = () => {
  //   fetch(
  //     `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUserProfile({
  //         id: data.id,
  //         username: data.Username,
  //         email: data.Email,
  //         favoriteMovies: data.FavouriteMovies,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data", error);
  //     });
  // };

  const bothHandlers = () => {
    UpdateUser();
    addFavorite();
  };

  //remove Favorite
  const removeFav = (id) => {
    // Make a delete request to the API
    const url = `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${Title}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove favorite movie");
        }
      })
      .catch((error) => {
        console.error("Error removing favorite movie", error);
      });
  };

  //add Favorite

  const addFavorite = (id) => {
    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${Title}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Movie added to favorites");
        } else {
          throw new Error("Failed to add movie to favorites");
        }
      })
      .catch((error) => {
        console.error("Error adding movie to favorites", error);
      });
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
                <Button variant="secondary" onClick={bothHandlers}>
                  Add
                </Button>
                <Button variant="secondary" onClick={() => addFavorite}>
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
