import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; // .jsx format ending not needed here
import { PropTypes } from "prop-types";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://cub-film-data-dc72bcc7ff05.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie.id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImagePath,
            director: movie.Director.Name,
            bio: movie.Director.Bio,
            birth: movie.Director.Birth,
            year: movie.Year,
            actors: movie.Actors
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            //onClick function doesnt work here
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

MainView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    descriptions: PropTypes.string,
    image: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string
    }).isRequired,
    year: PropTypes.string,
    actors: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
