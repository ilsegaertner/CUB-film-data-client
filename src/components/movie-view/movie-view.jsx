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

  // // Changes the property of a movie based on if they are in the Favorites List or not
  // useEffect(() => {
  //   if (user.FavouriteMovies && user.FavouriteMovies.includes(movieTitle)) {
  //     setIsFavourite(true);
  //   } else {
  //     setIsFavourite(false);
  //   }
  // }, [user]);

  // // Ensure that user and user's favorite movies are not undefined
  // useEffect(() => {
  //   if (user && user.FavouriteMovies) {
  //     setIsFavourite(user.FavouriteMovies.includes(movieTitle));
  //   }
  // }, [user, movieTitle]);

  //Function for adding a movie to their favorites

  // const addToFavourites = async () => {
  //   await fetch(
  //     `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/favourites/${movieTitle}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         console.log("Error adding movie to favourites");
  //       }
  //     })
  //     .then((user) => {
  //       if (user) {
  //         localStorage.setItem("user", JSON.stringify(user));
  //         setUser(user);
  //         setIsFavourite(true);
  //         console.log(user);
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // };

  const addFavouriteHandler = () => {
    // const updatedFavouriteMovies = [...user.FavouriteMovies, movieId];

    // // Update the user profile locally to provide immediate feedback to the user
    // setUserProfile((prevUser) => ({
    //   ...prevUser,
    //   FavouriteMovies: updatedFavouriteMovies,
    // }));

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
          // setUserProfile();
          // Update the user profile state with the fetched user data including updated favourites
          // setUserProfile(data);
          console.log(user);

          // Show a success message or provide feedback to the user
          alert(`${movie.title} from ${movie.director} added to favorites`);
        }
      })
      .catch((error) => {
        console.error(`Error adding ${movie.title} to favorites`, error);

        // Handle errors gracefully by showing user-friendly messages
        // or implementing a notification system to inform the user
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

  // // Button triggering the addFavoriteHandler function
  // <Button size="sm" onClick={addFavoriteHandler} className="addButton">
  //   Add
  // </Button>;

  console.log(user);

  return (
    <>
      <Container className="movieView">
        <Row>
          <Col xs={6}>
            <img src={movie.image} alt={movie.title} />
          </Col>
          <Col xs={4}>
            <span className="parameters">Title</span>
            <span>
              {" "}
              {movie.title} ({movie.year})
            </span>
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
            <div className="genre-description">
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
              {/* <span>{movie.actors}</span> */}
            </div>

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

            {/* <Button
              className="addButton"
              onClick={() => {
                removeFavouriteHandler();
              }}
            >
              Remove from Favourites
            </Button> */}

            {/* <div className="addButton">
              {favoriteMovieList.some(
                (favMovie) => favMovie.id === movie.id
              ) ? (
                <RemoveFavorite
                  movieId={movie.id}
                  movie={movie}
                  updateUser={updateUser}
                  user={user}
                  title={title}
                  token={token}
                  setUserProfile={setUserProfile}
                  favoriteMovieList={favoriteMovieList}
                  setFavoriteMovieList={setFavoriteMovieList}
                />
              ) : (
                <AddFavorite
                  movieId={movie.id}
                  movie={movie}
                  updateUser={updateUser}
                  user={user}
                  title={title}
                  token={token}
                  setUserProfile={setUserProfile}
                  favoriteMovieList={favoriteMovieList}
                  setFavoriteMovieList={setFavoriteMovieList}
                />
              )}
            </div> */}
          </Col>
          <Col>
            <Link to={`/`}>
              <Button className="back-button">Back</Button>
            </Link>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
};
