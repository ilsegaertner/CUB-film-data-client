import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();

  const selectedMovie = movies.find((movie) => movie.id === movieId);

  return (
    <div>
      <div>
        <img src={selectedMovie.image} />
      </div>
      <div>
        <span>Title:</span>
        <span>{selectedMovie.title}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{selectedMovie.description}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{selectedMovie.director}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{selectedMovie.year}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{selectedMovie.actors}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
