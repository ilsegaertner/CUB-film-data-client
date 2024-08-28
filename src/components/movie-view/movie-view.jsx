import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { addFavouriteHandler } from "../favouriteHandler";
import { removeFavouriteHandler } from "../favouriteHandler";

export const MovieView = ({ movies, setUser, user, token, updateUser }) => {
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

  return (
    <>
      <div className="movieView">
        <div>
          <div>
            <img src={movie.image} alt={movie.title} />
          </div>
          <div>
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
              >
                Director
              </span>
              {showDirectorBio && <span>{movie.bio}</span>}
            </div>
            <div className="genre-description">
              <span
                className="parametersClick"
                onClick={() => setShowGenreDescription(!showGenreDescription)}
              >
                Genre
              </span>
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
                  <Link to={`/movies/actor/${actor}`}>{actor}</Link>
                  {index < movie.actors.length - 1 && ", "}
                </span>
              ))}
            </div>

            <button
              className="addButton"
              onClick={() => {
                const isMovieInFavourites =
                  user.FavouriteMovies.includes(movieId);
                if (isMovieInFavourites) {
                  removeFavouriteHandler(movieId, user, token, updateUser);
                } else {
                  addFavouriteHandler(movieId, user, token, updateUser);
                }
              }}
            >
              {user.FavouriteMovies.includes(movieId)
                ? "Remove from Favourites"
                : "Add to Favourites"}
            </button>
          </div>
          <div>
            <Link to={`/`}>
              <button className="back-button">Back</button>
            </Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
};
