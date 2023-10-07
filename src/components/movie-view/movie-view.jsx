import { useParams } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { AddFavorite } from "../view-favorites/add-favorite";
import { RemoveFavorite } from "../view-favorites/remove-favorite";

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
      </div>
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
        {/* <span>{movie.director}</span> */}
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
              }} // Add cursor style
            >
              {actor}
            </Link>
            {index < movie.actors.length - 1 && ", "}
          </span>
        ))}
        {/* <span>{movie.actors}</span> */}
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

      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>

      {favoriteMovieList.some((favMovie) => favMovie.id === movie.id) ? (
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
  );
};
