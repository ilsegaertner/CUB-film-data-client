import React, { useEffect, useState } from "react";
import "./profile-view.scss";

import { UserInfo } from "./user-info";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateUser } from "./update-user";
import { DeleteProfile } from "./delete-profile";

export const ProfileView = ({
  token,
  movies,
  handleSubmit,
  userProfile,
  setUserProfile,
  onLoggedOut,
  user,
  updateUser,
}) => {
  // fetch userProfile and update it with setUserProfile
  useEffect(() => {
    if (!user || !token) return;

    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserProfile({
          id: data._id,
          username: data.Username,
          email: data.Email,
          birthday: data.Birthday,
          favouriteMovies: data.FavouriteMovies || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, [token, user]);

  // Filters based on the user's favorite Movies array
  let favouriteMovieList = user.FavouriteMovies
    ? movies.filter((movie) => user.FavouriteMovies.includes(movie.id))
    : [];

  return (
    <div className="profileContainer">
      <section className="profile-info-grid">
        <UserInfo user={user} />

        <UpdateUser
          user={user}
          token={token}
          handleSubmit={handleSubmit}
          updateUser={updateUser}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
        <DeleteProfile user={user} onLoggedOut={onLoggedOut} token={token} />
      </section>
      <section className="fav-movies-section">
        <h2>Likes</h2>
        <div className="fav-movie-wrapper">
          {favouriteMovieList.map((movie, id) => {
            return (
              <div className="fav-movie">
                <MovieCard
                  user={user}
                  setUserProfile={setUserProfile}
                  updateUser={updateUser}
                  movie={movie}
                  token={token}
                  movieId={movie.id}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
