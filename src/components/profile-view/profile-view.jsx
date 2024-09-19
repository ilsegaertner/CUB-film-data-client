import React, { useEffect, useState } from "react";
import "./profile-view.scss";

import { UserInfo } from "./user-info";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateUser } from "./update-user";
import { DeleteProfile } from "./delete-profile";

import { useUserContext } from "../../UserContext";

export const ProfileView = ({ movies }) => {
  const { user } = useUserContext();

  // useEffect(() => {
  //   if (!user || !user.Username || !token) {
  //     return;
  //   }

  //   fetch(
  //     `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
  //     {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (!data) {
  //         throw new Error("Received null or invalid data");
  //       }
  //       setUser({
  //         id: data._id,
  //         Username: data.Username,
  //         Email: data.Email,
  //         Birthday: data.Birthday,
  //         FavouriteMovies: data.FavouriteMovies || [],
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data", error);
  //     });
  // }, [token]);

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
