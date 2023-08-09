import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; // .jsx format ending not needed here
 

export const MainView = () => {

  const [movies, setMovies] = useState([
    {
      id:1, 
      title: "Breathless",
      director: "Jean-Luc Godard", 
      description: "A young, impulsive criminal in Paris is constantly on the run from the police after killing a policeman. He seeks refuge with his American girlfriend and engages in philosophical discussions amidst their rebellious activities.",
      image: "https://m.media-amazon.com/images/I/71IojHQKNFL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id:2, 
      title: "Persona",
      director: "Ingmar Bergman", 
      description: "A nurse is assigned to take care of an actress who has decided to stop speaking. As they spend time together on a remote island, their identities begin to blur, blurring the lines between reality and illusion.",
      image: "https://m.media-amazon.com/images/I/71Svr6wE4lL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id:3, 
      title: "Blue Velvet",
      director: "David Lynch", 
      description: "A dark and surreal exploration of a young man's journey into a small town's seedy underbelly after he discovers a severed ear. His curiosity leads him into a web of intrigue, violence, and psychological torment.",
      image: "https://m.media-amazon.com/images/I/8173nTPEhfL._AC_UF1000,1000_QL80_.jpg"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  };

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button onClick={() => { // --> pass a callback function to the onClick attribute
        alert("Nice!");
      }}
      >
        Click Me!
      </button>
      {books.map((book) => (
        <bookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
