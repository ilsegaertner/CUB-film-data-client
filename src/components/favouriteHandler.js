export const addFavouriteHandler = (
  movieId,
  user,
  token,
  updateUser,
) => {
  if (!movieId) {
    console.error("Movie ID not found");
    return;
  }

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
          throw new Error(`Failed to add to favorites: ${errorMessage}`);
        });
      }
    })
    .then((data) => {
      if (data) {
        updateUser();
 
        console.log(user);

        // Show a success message or provide feedback to the user
        alert("Movie added to favorites");
      }
    })
    .catch((error) => {
      console.error("Error adding movie to favorites", error);

      // Handle errors gracefully by showing user-friendly messages
      // or implementing a notification system to inform the user
    });
};

export const removeFavouriteHandler = (
  movieId,
  user,
  token,
  updateUser,
  title
) => {
  if (!movieId) {
    console.error("Movie ID not found");
    return;
  }

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
        // Filter out the movie from the user's favourite list
        const updatedFavouriteMovies = user.FavouriteMovies.filter(
          (favMovieId) => favMovieId !== title
        );
        // Update the user state locally to reflect the removal of the favorite movie
        const updatedUser = {
          ...user,
          FavouriteMovies: updatedFavouriteMovies,
        };
        updateUser(updatedUser);

        // User Feedback
        alert("Movie removed from favorites");
      } else {
        throw new Error("Failed to remove movie from favourites");
      }
    })
    .catch((error) => {
      console.error("Failed to remove movie", error);
    });
};
