import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { AddFavorite } from "../view-favorites/add-favorite";
import { RemoveFavorite } from "../view-favorites/remove-favorite";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MovieView = ({
  movies,
  setUser,
  user,
  token,
  updateUser,
  title,
}) => {
  const { movieTitle } = useParams(); // useParams allows us to use the URL (which is how our backend is setup for movieView)
  const movie = movies.find((m) => m.title === movieTitle);
  const movieId = movie ? movie.id : null;

  const [showGenreDescription, setShowGenreDescription] = useState(false);
  const [showDirectorBio, setShowDirectorBio] = useState(false);

  // makes sure that we have our user stored and is parsed
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  console.log(user);

  const addFavouriteHandler = () => {
    if (!movieId) {
      console.error("Movie ID not found");
      return;
    }

    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`,
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
          return response.json();
        } else {
          return response.text().then((errorMessage) => {
            throw new Error(
              `Failed to add ${movie.title} to favorites: ${errorMessage}`
            );
          });
        }
      })
      .then((data) => {
        if (data) {
          updateUser();

          console.log(user);

          // Show a success message or provide feedback to the user
          alert(`${movie.title} from ${movie.director} added to favorites`);
        }
      })
      .catch((error) => {
        console.error(`Error adding ${movie.title} to favorites`, error);
      });
  };

  const removeFavouriteHandler = () => {
    if (!movieId) {
      console.error("Movie ID not found");
      return;
    }

    // Make a delete request to the API
    const url = `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Filter out the movie from the user's favourite list
          const updatedFavouriteMovies = user.FavouriteMovies.filter(
            (favMovieId) => favMovieId !== title
          );
          // Update the user state locally to reflect the removal of the favorite movie
          const updatedUser = {
            ...user,
            FavouriteMovies: updatedFavouriteMovies,
          };
          updateUser(updatedUser);
          // setUserProfile(updateUser);

          // User Feedback
          alert(`${movie.title} from ${movie.director} removed from favorites`);
        } else {
          throw new Error(`Failed to remove ${movie.title}`);
        }
      })
      .catch((error) => {
        console.error(`Failed to remove ${movie.title}`, error);
      });
  };

  console.log(user);

  return (
    <>
      <Container className="movieView">
        <Row>
          <Col xs={12} lg={5} md={12}>
            <Link to={`/`}>
              <Button className="back-button mb-2">Back</Button>
            </Link>{" "}
            <img src={movie.image} alt={movie.title} />
          </Col>
          <Col xs={12} lg={7} md={12} className="mt-3">
            <h2>
              {movie.title} ({movie.year})
            </h2>
            <span className="parameters">Title</span>
            <span> {movie.title}</span>
            <div>
              <span className="parameters">Description</span>
              <span> {movie.description}</span>
            </div>
            <div>
              <span
                className="parametersClick"
                onClick={() => setShowDirectorBio(!showDirectorBio)}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                Director
              </span>{" "}
              {showDirectorBio && <span>{movie.bio}</span>}
            </div>
            <div
              className="genre-description"
              style={{
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <span
                className="parametersClick"
                onClick={() => setShowGenreDescription(!showGenreDescription)}
                style={{ textDecoration: "none", cursor: "pointer" }} // Add cursor style
              >
                Genre
              </span>{" "}
              {showGenreDescription && <span>{movie.genreDescription}</span>}
            </div>
            <div>
              <span className="parameters">Year </span>
              <span>{movie.year}</span>
            </div>
            <div>
              <span className="parameters">Actors </span>
              {movie.actors.map((actor, index) => (
                <span key={index}>
                  <Link
                    to={`/movies/actor/${actor}`}
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      fontStyle: "italic",
                    }}
                  >
                    {actor}
                  </Link>
                  {index < movie.actors.length - 1 && ", "}
                </span>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="mt-2">
            {/* <Link to={`/`}>
              <Button className="back-button">Back</Button>
            </Link>{" "} */}
            <Button
              className="addButton"
              onClick={() => {
                const isMovieInFavourites =
                  user.FavouriteMovies.includes(movieId);
                if (isMovieInFavourites) {
                  removeFavouriteHandler();
                } else {
                  addFavouriteHandler();
                }
              }}
            >
              {user.FavouriteMovies.includes(movieId)
                ? "Remove from Favourites"
                : "Add to Favourites"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
