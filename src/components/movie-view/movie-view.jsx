import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

<<<<<<< Updated upstream
export const MovieView = ({ movie, movies }) => {
  const { movieId } = useParams();
=======
export const MovieView = ({ movie }) => {
  const { movieId } = useParams(); // used to access the movieId URL param
>>>>>>> Stashed changes

  const selectedMovie = movies.find((movie) => movie.id === movieId); //To render this data properly, you need to look at all the movies to find the one whose id matches. You need to do it this way because React Router will only give you access to the parameter inside the component that gets rendered (to be specific, the one you list in element prop in the <Route />). This is why you needed the full array of movies in order to perform the .find() operation on it to get the targeted movie.

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
