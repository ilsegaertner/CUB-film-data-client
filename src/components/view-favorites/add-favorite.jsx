//add Favorite

import { useState } from "react";
import { Button } from "react-bootstrap";

export const AddFavorite = ({ token, movieId }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  const [user, setUserProfile] = useState(storedUser || null); //added logic for persisting a Login Session

  const bothHandlers = () => {
    addFavoriteHandler();
    // updateUserFavorite();
  };

  // const updateUserFavorite = () => {
  //   const { favouriteMovies } = user;
  //   const data = {
  //     favouriteMovies: movieId,
  //   };

  //   console.log("updateUser function called in add-favorite.jsx");
  //   // ... rest of the function

  //   fetch(
  //     `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   )
  //     .then((response) => {
  //       if (response.ok) {
  //         alert("Your profile was updated.");
  //       } else {
  //         alert("Form submission failed.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting form", error);
  //       alert("Form submission failed.");
  //     });
  // };

  const addFavoriteHandler = () => {
    const updatedFavouriteMovies = [...user.FavouriteMovies, movieId]; // If the movie was added successfully, update the local state
    // and user's FavouriteMovies array
    setUserProfile({ ...user, FavouriteMovies: updatedFavouriteMovies });

    console.log("Movie ID passed to AddFavorite:", movieId);

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
          return response.json(); //parse the response
        } else {
          return response.text().then((errorMessage) => {
            throw new Error(
              `Failed to add movie to favorites: ${errorMessage}`
            );
          });
        }
      })
      .then((data) => {
        if (data) {
          // Update the user state with the received data
          setUserProfile(data); // Assuming the data contains the updated user profile
          console.log("Updated User Data:", user);
        }
        console.log("API Response:", data); // Log the response data
        // If needed, update the local state or user's FavouriteMovies array
        // ...
        alert("Movie added to favorites");
      })
      .catch((error) => {
        console.error("Error adding movie to favorites", error);
      });
  };
  console.log(user);
  return (
    <Button size="sm" onClick={bothHandlers}>
      Add
    </Button>
  );
};
