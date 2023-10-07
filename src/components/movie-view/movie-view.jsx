import { useParams } from "react-router";
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

  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title:</span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors}</span>
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

      {/* 
      {favoriteMovieList.includes(movie.id) ? (
        <RemoveFavorite
          movieId={movie.id}
          movie={movie}
          user={user}
          token={token}
        />
      ) : (
        <AddFavorite
          movieId={movie.id}
          movie={movie}
          user={user}
          token={token}
        />
      )} */}

      {/* <Link to={`/`}>
        <button className="fav-button">{`❤️`}</button>
      </Link> */}
    </div>
  );
};
