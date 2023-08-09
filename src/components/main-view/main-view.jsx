import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; // .jsx format ending not needed here

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Breathless",
      director: "Jean-Luc Godard",
      description:
        "A young, impulsive criminal in Paris is constantly on the run from the police after killing a policeman. He seeks refuge with his American girlfriend and engages in philosophical discussions amidst their rebellious activities.",
      genre: "Crime",
      image:
        "https://media.gettyimages.com/id/1137163673/de/foto/breathless-poster-french-poster-jean-seberg-jean-paul-belmondo-1960.jpg?s=612x612&w=gi&k=20&c=CA-2stYuz4KoKhanhROzNUfpDLjaHwPHjuEPJuwDHJ8=",
      year: "1983",
      actors: ["Jean-Paul Belmondo ", "Jean Seberg ", "Van Doude"]
    },
    {
      id: 2,
      title: "Persona",
      director: "Ingmar Bergman",
      description:
        "A nurse is assigned to take care of an actress who has decided to stop speaking. As they spend time together on a remote island, their identities begin to blur, blurring the lines between reality and illusion.",
      genre: "Psychological",
      image:
        "https://www.crew-united.com/Media/Images/1267/1267643/1267643.entity.jpg",
      year: "1966",
      actors: ["Bibi Andersson ", "Liv Ullmann ", "Margaretha Krook"]
    },
    {
      id: 3,
      title: "Blue Velvet",
      director: "David Lynch",
      description:
        "A dark and surreal exploration of a young man's journey into a small town's seedy underbelly after he discovers a severed ear. His curiosity leads him into a web of intrigue, violence, and psychological torment.",
      genre: "Thriller",
      image:
        "https://de.web.img3.acsta.net/c_310_420/medias/nmedia/18/63/48/37/18692774.jpg",
      year: "1986",
      actors: ["Isabella Rossellini ", "Kyle MacLachlan ", "Dennis Hopper"]
    },
    {
      id: 4,
      title: "Wings of Desire",
      director: "Wim Wenders",
      description:
        "Set in divided Berlin, the film follows invisible angels who listen to the thoughts of human beings. One angel falls in love with a trapeze artist and decides to become human, experiencing the joys and pains of mortal life.",
      genre: "Fantasy",
      image:
        "https://i.discogs.com/v_dJWVP7v4qzdH3u1BfpursO71XNhVjIS_DS7dH0luo/rs:fit/g:sm/q:90/h:600/w:564/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYyMDM4/My0xNDU1NzA5MDk2/LTE2MTcuanBlZw.jpeg",
      year: "1987",
      actors: ["Bruno Ganz ", "Solveig Dommartin ", "Otto Sander"]
    },
    {
      id: 5,
      title: "The Elephant Man",
      director: "David Lynch",
      description:
        "Based on a true story, the film follows the life of Joseph Merrick, a severely deformed man who becomes a popular figure in Victorian society while facing exploitation and loneliness.",
      genre: "Drama",
      image:
        "https://pics.filmaffinity.com/The_Elephant_Man-932575144-large.jpg",
      year: "1980",
      actors: ["Anthony Hopkins ", "John Hurt ", "Anne Bancroft"]
    }
  ]);

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

export default MainView;