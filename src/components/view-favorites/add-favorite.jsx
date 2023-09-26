//add Favorite
const addFavorite = () => {
  fetch(
    `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${title}`,
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
        alert("Movie added to favorites");
      } else {
        throw new Error("Failed to add movie to favorites");
      }
    })
    .catch((error) => {
      console.error("Error adding movie to favorites", error);
    });
};
