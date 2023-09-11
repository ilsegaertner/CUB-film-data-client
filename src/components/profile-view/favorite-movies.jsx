import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";

export const FavoriteMovies = ({
  user,
  Title,
  token,
  movies,
  favoriteMovieList,
}) => {
  const [userProfile, setUserProfile] = useState(null);
  const favoriteMovies = user.favoriteMovies || [];

  useEffect(() => {
    fetchUserData();
  }, [user.Username, token]);

  const fetchUserData = () => {
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
          id: data.id,
          username: data.Username,
          email: data.Email,
          favoriteMovies: data.FavouriteMovies,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  };

  //     response.json())
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

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${Title}`}>
                    <Figure.Image src={ImagePath} alt={Title} />
                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="secondary" onClick={() => removeFav(_id)}>
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
