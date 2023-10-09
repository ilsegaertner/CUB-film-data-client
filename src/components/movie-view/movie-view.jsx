import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { AddFavorite } from "../view-favorites/add-favorite";
import { RemoveFavorite } from "../view-favorites/remove-favorite";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MovieView = ({
  movies,
  favoriteMovieList,
  user,
  token,
  setFavoriteMovieList,
  updateUser,
  setUserProfile,
  title,
}) => {
  const { movieTitle } = useParams();
  const movie = movies.find((m) => m.title === movieTitle);

  const [showGenreDescription, setShowGenreDescription] = useState(false);
  const [showDirectorBio, setShowDirectorBio] = useState(false);

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
            <div className="addButton">
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
            </div>
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
