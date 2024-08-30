// This component is supposed to show the favMovies as a small div on the MainView

import React, { useState } from "react";

const FavMovies = ({ user, movies }) => {
  const [showFavsAside, setShowFavsAside] = useState(false);

  let favouriteMovieList = user?.FavouriteMovies
    ? movies.filter((movie) => user.FavouriteMovies.includes(movie.id))
    : [];

  console.log("user from FavMovies:", user);
  console.log("favouriteMovieList from FavMovies:", favouriteMovieList);

  return (
    <>
      <div className="likes-aside-wrapper">
        <button onClick={() => setShowFavsAside(true)}>Show favs</button>
        {showFavsAside && (
          <>
            <div className="fav-movies-div">
              <p>Likes</p>
              <button onClick={() => setShowFavsAside(false)}>X</button>

              <ul>
                {favouriteMovieList.map((movie) => (
                  <li key={movie.id}>
                    <img src={movie.image} width={20} /> {movie.title}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FavMovies;
