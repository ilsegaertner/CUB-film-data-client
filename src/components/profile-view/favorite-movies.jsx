// This component is supposed to show the favMovies as a small div on the MainView

import React, { useState } from "react";

const FavMovies = ({ user, movies }) => {
  let favouriteMovieList = user.FavouriteMovies
    ? movies.filter((movie) => user.FavouriteMovies.includes(movie.id))
    : [];

  console.log("user from FavMovies:", user);
  console.log("favouriteMovieList from FavMovies:", favouriteMovieList);

  return (
    <>
      <div className="fav-movies-div">
        <p>Likes</p>
        <ul>
          {favouriteMovieList.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FavMovies;
