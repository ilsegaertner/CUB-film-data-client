import { Button } from "react-bootstrap";

export const RemoveFavorite = ({
  user,
  title,
  token,
  movieId,
  movie,
  setUserProfile,
  favoriteMovieList,
  setFavoriteMovieList,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const deleteFavoriteHandler = () => {
    const updatedFavoriteMovies = favoriteMovieList.filter(
      (favMovie) => favMovie.id !== movieId
    );

    setFavoriteMovieList(updatedFavoriteMovies);

    // Make a delete request to the API
    const url = `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Update the user state locally to reflect the removal of the favorite movie
          const updatedFavouriteMovies = user.FavouriteMovies.filter(
            (movieId) => movieId !== title
          );
          const updatedUser = {
            ...user,
            FavouriteMovies: updatedFavouriteMovies,
          };
          setUserProfile(updatedUser);

          alert(`${movie.title} from ${movie.director} removed from favorites`);
        } else {
          throw new Error(`Failed to remove ${movie.title}`);
        }
      })
      .catch((error) => {
        console.error(`Failed to remove ${movie.title}`, error);
      });
  };

  return (
    <Button size="sm" onClick={deleteFavoriteHandler}>
      Remove
    </Button>
  );
};
