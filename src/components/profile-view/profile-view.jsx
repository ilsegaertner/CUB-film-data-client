import React, { useEffect, useState } from "react";
import "./profile-view.scss";

import { UserInfo } from "./user-info";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateUser } from "./update-user";
import { DeleteProfile } from "./delete-profile";

// import { useUserContext } from "../../userContext";
import { useUserContext } from "../../UserContext";

export const ProfileView = ({ movies }) => {
  const { user, setUser, token } = useUserContext();

  useEffect(() => {
    console.log("User in ProfileView:", user); // Log the entire user object
    console.log("Username:", user?.Username); // Check the Username field
    console.log("Token:", token);

    if (!user || !user.Username || !token) {
      console.log("No user or token available.", { user, token });
      return;
    }

    console.log("Username:", user.Username); // Check the actual value of Username

    // console.log("Token used for request:", token);
    // console.log("User:", user);

    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        console.log("Response:", response); // Check status
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data); // Log the received data
        if (!data) {
          throw new Error("Received null or invalid data");
        }
        setUser({
          id: data._id,
          Username: data.Username,
          Email: data.Email,
          Birthday: data.Birthday,
          FavouriteMovies: data.FavouriteMovies || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, [token]);

  console.log(user);

  // Filters based on the user's favorite Movies array
  let favouriteMovieList = user?.FavouriteMovies?.length
    ? movies.filter((movie) => user.FavouriteMovies.includes(movie.id))
    : [];

  return (
    <div className="profileContainer">
      <section className="profile-info-grid">
        <UserInfo />

        <UpdateUser />
        <DeleteProfile />
      </section>
      <section className="fav-movies-section">
        <h2>Likes</h2>
        <div className="fav-movie-wrapper">
          {favouriteMovieList.map((movie, id) => {
            return (
              <div className="fav-movie" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
