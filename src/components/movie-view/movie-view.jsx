import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
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
      <Link to={`/`}>
        <button className="fav-button">{`❤️`}</button>
      </Link>
    </div>
  );
};
