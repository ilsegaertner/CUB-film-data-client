import { Button } from "react-bootstrap";
import "./favorites.scss";

export const AddFavorite = ({
  token,
  movieId,
  movie,
  setFavoriteMovieList,
  setUserProfile,
  user,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const bothHandlers = () => {
    addFavoriteHandler();
  };

  const addFavoriteHandler = () => {
    const updatedFavouriteMovies = [...user.FavouriteMovies, movieId];
    setUserProfile({ ...user, FavouriteMovies: updatedFavouriteMovies });

    setFavoriteMovieList(updatedFavouriteMovies);

    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((errorMessage) => {
            throw new Error(
              `Failed to add ${movie.title} to favorites: ${errorMessage}`
            );
          });
        }
      })
      .then((data) => {
        if (data) {
          setUserProfile(data);
          setFavoriteMovieList(updatedFavouriteMovies);
        }
        alert(`${movie.title} from ${movie.director} added to favorites`);
      })
      .catch((error) => {
        console.error(`Error adding ${movie.title} to favorites`, error);
      });
  };
  return (
    <Button size="sm" onClick={bothHandlers} className="addButton">
      Add
    </Button>
  );
};
