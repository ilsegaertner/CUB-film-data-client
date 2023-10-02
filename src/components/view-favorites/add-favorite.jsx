//add Favorite

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const AddFavorite = ({ movie, token, movieId, user: propUser }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(propUser || storedUser || null); //added logic for persisting a Login Session

  console.log(movie);

  //alternative
  // useEffect(() => {
  //   console.log("Inside useEffect: user =", propUser); // Log the user state

  //   if (propUser && token) {
  //     fetch(
  //       `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         if (response.ok) {
  //           response.json();
  //         } else {
  //           alert("Failed to fetch user data.");
  //         }
  //       })
  //       .then((userData) => {
  //         setUser(userData);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data", error);
  //         alert("Failed to fetch user data");
  //       });
  //   }
  // }, [token, propUser]);

  // const updatedUserFavorite = () => {
  //   const data = {
  //     Username: Username,
  //     Password: Password,
  //     Email: Email,
  //     Birthday: Birthday,
  //     FavouriteMovies: FavouriteMovies,
  //   };
  //   const { Username, Password, Email, Birthday, FavouriteMovies } = user;
  //   if (user) {
  //     const updatedFavouriteMovies = [...user.FavouriteMovies, movieId];
  //     setUser({ ...user, FavouriteMovies: updatedFavouriteMovies });
  //     alert("Movie added to favorites");

  //     fetch(
  //       `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           ...user,
  //           FavouriteMovies: updatedFavouriteMovies,
  //         }),
  //       }
  //     )
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           return response.text().then((errorMessage) => {
  //             throw new Error(`Failed to update user data: ${errorMessage}`);
  //           });
  //         }
  //       })
  //       .then((userData) => {
  //         setUser(userData);
  //         console.log("Updated user data:", userData);
  //       })
  //       .catch((error) => {
  //         console.error("Error updating user data", error);
  //         alert("Failed to update user data.");
  //       });
  //   }
  // };

  // const addFavoriteHandler = () => {
  //   if (user) {
  //     const updatedFavouriteMovies = [...user.FavouriteMovies, movieId];
  //     setUser({ ...user, FavouriteMovies: updatedFavouriteMovies });
  //     alert("Movie added to favorites");

  //     fetch(
  //       `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           return response.text().then((errorMessage) => {
  //             throw new Error(
  //               `Failed to add movie to favorites: ${errorMessage}`
  //             );
  //           });
  //         }
  //       })
  //       .then((data) => {
  //         if (data) {
  //           setUser(data);
  //           console.log("Updated User Data:", data);
  //         }
  //         console.log("API response:", data);
  //         alert("Movie added to favorites");
  //       })
  //       .catch((error) => {
  //         console.error("Error adding movie to favorites.", error);
  //       });
  //   }
  // };

  const bothHandlers = () => {
    updateUserFavorite();
    addFavoriteHandler();
  };

  const updateUserFavorite = () => {
    const { Username, Password, Email, Birthday, FavouriteMovies } = user;

    console.log("updateUser function called in add-favorite.jsx");
    // ... rest of the function

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
      FavouriteMovies: FavouriteMovies,
    };

    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Your profile was updated.");
        } else {
          alert("Form submission failed.");
        }
      })
      .catch((error) => {
        console.error("Error submitting form", error);
        alert("Form submission failed.");
      });
  };

  const addFavoriteHandler = () => {
    const updatedFavouriteMovies = [...user.FavouriteMovies, movieId]; // If the movie was added successfully, update the local state
    // and user's FavouriteMovies array
    setUser({ ...user, FavouriteMovies: updatedFavouriteMovies });
    alert("Movie added to favorites");

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
          setUser(data); // Assuming the data contains the updated user profile
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

  return (
    <Button size="sm" onClick={bothHandlers}>
      Add
    </Button>
  );
};
