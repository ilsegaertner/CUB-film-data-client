import React, { useEffect, useState } from "react";

import "../moviesOmdb/moviesOmdb.scss";

import { API_KEY } from "../../config";

import Dropdown from "../ui/dropdown/dropdown";
import Spinner from "../ui/spinner";

export const MoviesFromOMDB = () => {
  const [movieData, setMovieData] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${query}`
      );
      const data = await response.json();
      setMovieData(data);
      console.log("Api test, data:", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("Component mounted, useEffect called"); // Log to check if useEffect runs

  //     try {
  //       const response = await fetch(
  //         `https://www.omdbapi.com/?apikey=59e62a8f&t=${query}`
  //       );
  //       const data = await response.json();
  //       setMovieData(data);
  //       console.log("Api test, data:", data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  console.log("Api test, movies:", movieData);

  const movieRatings = movieData.Ratings;

  return (
    <>
      <div className="api-wrapper">
        <form onSubmit={handleSubmit} className="OMDBWrap">
          <div className="VerticalContainer">
            <div className="omdb-heading">
              {" "}
              <h1>
                {" "}
                <span className="heading-color-element red">O</span>
                <span className="heading-color-element yellow">M</span>
                <span className="heading-color-element orange">D</span>
                <span className="heading-color-element white">B</span> Film Data{" "}
              </h1>
            </div>
            <span className="CubDescription">
              {" "}
              Browse the OMBD database courtesy of www.omdbapi.com/
            </span>
          </div>
          {/* <label>Search</label> */}
          <div className="enter-search">
            <input
              type="text"
              value={query}
              placeholder="search a movie"
              onChange={handleQueryChange}
            />
            <button type="submit">submit</button>
          </div>
        </form>

        {loading ? (
          <Spinner />
        ) : movieData && movieData.Response === "True" ? (
          <div className="data-wrapper">
            {movieData.Poster && movieData.Poster !== "N/A" ? (
              <div className="poster-wrapper">
                <img src={movieData.Poster} alt={`${movieData.Title} poster`} />
              </div>
            ) : (
              <p>No Poster available</p>
            )}
            <ul className="movie-data-api-ul">
              <li className="bold-title">{movieData.Title}</li>
              <li>{movieData.Year}</li>
              <li>Director: {movieData.Director}</li>
              <li>Genre: {movieData.Genre}</li>
              <li>Awards: {movieData.Awards}</li>
              <li>Actors: {movieData.Actors}</li>
              {/* <li>{movieData.Rated}</li> */}
              <li>Released: {movieData.Released}</li>
              <li>{movieData.Runtime}</li>
              <li key={movieRatings.id}>
                Ratings:
                {movieRatings.map((movieRating) => (
                  <p>
                    {movieRating.Source}: {movieRating.Value},{" "}
                  </p>
                ))}
              </li>
            </ul>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};
