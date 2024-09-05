import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { addFavouriteHandler } from "../favouriteHandler";
import { removeFavouriteHandler } from "../favouriteHandler";
import Modal from "../modal/modal";

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
      <form className="CubWrap">
        <div className="VerticalContainer">
          <h1 className="CUB">
            {movie.title} ({movie.year})
          </h1>
          <div className="movie-view-button-wrapper">
            {" "}
            <button
              className="addButton"
              onClick={(e) => {
                e.preventDefault();
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
            <div>
              <Link to={`/`}>
                <button className="back-button">Back</button>
              </Link>{" "}
            </div>
          </div>
        </div>
        <span className="CubDescription">{movie.director}</span>
      </form>
      <div className="movieView">
        <div className="movie-view-wrapper">
          <div>
            <img src={movie.image} alt={movie.title} />
          </div>
          <div className="movie-view-text">
            {/* <span className="parameters">Title</span> */}
            <span> "{movie.title}" </span>({movie.year})
            <div>
              {/* <span className="parameters">Description</span> */}
              {movie.description}
            </div>
            <div className="parameters-wrapper">
              <span
                className="parametersClick"
                onClick={() => setShowDirectorBio(true)}
              >
                Director{" "}
              </span>
              {/* {showDirectorBio && <span>{movie.bio}</span>} */}
            </div>
            <div className="genre-description parameters-wrapper">
              <span
                className="parametersClick"
                onClick={() => setShowGenreDescription(true)}
              >
                Genre{" "}
              </span>
              {/* {showGenreDescription && <span>{movie.genreDescription}</span>} */}
            </div>
            {/* <div>
              <span className="parameters">Year </span>
              <span>{movie.year}</span>
            </div> */}
            <div>
              <span className="parameters">Actors </span>
              {movie.actors.map((actor, index) => (
                <span key={index}>
                  <Link to={`/movies/actor/${actor}`} className="actors">
                    {actor}
                  </Link>
                  {index < movie.actors.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals for Director Bio and Genre Description */}

      {movie && (
        <>
          <Modal
            show={showDirectorBio}
            onClose={() => setShowDirectorBio(false)}
          >
            {" "}
            <h3>Director Bio</h3>
            <p>{movie.bio}</p>
          </Modal>

          <Modal
            show={showGenreDescription}
            onClose={() => setShowGenreDescription(false)}
          >
            {" "}
            <h3>Genre Description</h3>
            <p>{movie.genreDescription}</p>
          </Modal>
        </>
      )}
    </>
  );
};
