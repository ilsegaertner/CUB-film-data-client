//remove Favorite
const removeFav = () => {
  // Make a delete request to the API
  const url = `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${title}`;

  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Movie removed from favorites");
      } else {
        throw new Error("Failed to remove favorite movie");
      }
    })
    .catch((error) => {
      console.error("Error removing favorite movie", error);
    });
};
