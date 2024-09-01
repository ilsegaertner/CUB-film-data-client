import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
// import { Form, ToastContainer } from "react-bootstrap";

//import toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MoviesFromOMDB } from "../moviesOmdb/moviesOmdb";

// import components
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; // .jsx format ending not needed here
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

import FavMovies from "../profile-view/favorite-movies";

import Spinner from "../ui/spinner";

// import "../ui/spinner.css";
// import Spinner from "react-bootstrap/Spinner";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState(null);

  const [user, setUser] = useState(storedUser ? storedUser : null); //added logic for persisting a Login Session
  const [token, setToken] = useState(storedToken ? storedToken : null); //added logic for persisting a Login Session

  const [userProfile, setUserProfile] = useState({});

  // displaying filtered movies from search query
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(false);

  const location = useLocation();

  //fetch Movies
  useEffect(() => {
    if (!token) return;

    fetch("https://cub-film-data-dc72bcc7ff05.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImagePath,
            genre: movie.Genre.Name,
            genreDescription: movie.Genre.Description,
            director: movie.Director.Name,
            bio: movie.Director.Bio,
            birth: movie.Director.Birth,
            year: movie.Year,
            actors: movie.Actors,
          };
        });
        setMovies(moviesFromApi);
        setMovieId(moviesFromApi[0]?.id); // Set the movieId from the fetched movies
        setMoviesToRender(moviesFromApi);
      });
  }, [token]);

  // handle Movie Search
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);

    const filteredMovies = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMoviesToRender(filteredMovies);
  };
  const handleClearSearch = () => {
    setSearchQuery("");
    setMoviesToRender(movies);
  };

  // handle logOut
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  //update User
  const updateUser = () => {
    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        alert(
          "Failed to update user information. Please try again later or check your network connection. " +
            error
        );
      });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (!isDarkMode) {
      document.documentElement.style.setProperty("--color-main", "#f4f4f4");
      document.documentElement.style.setProperty("--bg-color", "#191919");
    } else {
      document.documentElement.style.setProperty("--color-main", "#191919");
      document.documentElement.style.setProperty("--bg-color", "#f4f4f4");
    }
  };

  return (
    <>
      {/* // <BrowserRouter> */}
      <div className="wrapper">
        <div className="left-side">
          <div className="nav">
            <NavigationBar user={user} onLoggedOut={onLoggedOut} />
            <FavMovies user={user} movies={movies} />

            {location.pathname === "/" ? (
              <button onClick={toggleDarkMode}>
                <Link to="/apimovies">OMBD Database</Link>
              </button>
            ) : (
              <button onClick={toggleDarkMode}>
                <Link to="/"> CUB Film Arthouse Database</Link>
              </button>
            )}
          </div>
        </div>

        <div className="right-side">
          <Routes>
            <Route
              path="/apimovies"
              element={
                user ? <MoviesFromOMDB /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <div>
                      <SignupView />
                    </div>
                  )}
                </>
              }
            />

            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <div>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user), setToken(token);
                        }}
                      />
                    </div>
                  )}
                </>
              }
            />

            {/* Profile  */}
            <Route
              path="/profile"
              element={
                user ? (
                  <>
                    <ProfileView
                      user={user}
                      movies={movies}
                      token={storedToken}
                      updateUser={updateUser}
                      setUserProfile={setUserProfile}
                      onLoggedOut={() => {
                        setUser(null), setToken(null), localStorage.clear();
                      }}
                    />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/movies/:movieTitle"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Spinner />
                  ) : (
                    // <div className="error">The list is empty!</div>
                    <div>
                      <MovieView
                        user={user}
                        setUser={setUser}
                        updateUser={updateUser}
                        movies={movies}
                        token={token}
                      />
                    </div>
                  )}
                </>
              }
            />

            <Route
              path="/"
              element={
                <>
                  {/* <div className="left-side">
                    <div className="nav">
                      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
                      <FavMovies user={user} movies={movies} />

                      {location.pathname === "/" ? (
                        <button onClick={toggleDarkMode}>
                          <Link to="/apimovies">OMBD Database</Link>
                        </button>
                      ) : (
                        <button onClick={toggleDarkMode}>
                          <Link to="/"> CUB Film Arthouse Database</Link>
                        </button>
                      )}
                    </div>
                  </div> */}

                  <form className="CubWrap">
                    <div className="VerticalContainer">
                      <h1 className="CUB">CUB Film Data</h1>
                    </div>
                    <span className="CubDescription">
                      Browse our inhouse database for arthouse classics and save
                      your favorite movies
                    </span>
                    <input
                      size="lg"
                      type="text"
                      placeholder="Search movies..."
                      className="search-movies"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                    {searchQuery && (
                      <button
                        className="clear-button"
                        onClick={() => handleClearSearch()}
                      >
                        X
                      </button>
                    )}
                  </form>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : moviesToRender.length === 0 ? (
                    <Spinner />
                  ) : (
                    // <div className="error">The list is empty!</div>
                    <>
                      <div className="moviecard-wrap">
                        {moviesToRender.map((movie) => (
                          <MovieCard
                            key={movie.id}
                            movie={movie}
                            movieId={movie.id}
                            user={user}
                            updateUser={updateUser}
                            token={token}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              }
            />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={1800}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
            // toastId="005"
            limit={1}
            preventDuplicates={true}
          />
        </div>
      </div>{" "}
      <section className="footer">
        <div className="footer-wrapper">
          <div className="social-media">
            <a href="">
              <img src="." />
            </a>
            <a href="">
              <img src="../../assets/683981_github_square_connection_network_share_icon.svg" />
            </a>
            <a href="">
              <img src="../../assets/683981_github_square_connection_network_share_icon.svg" />
            </a>
          </div>
        </div>
      </section>
      {/* </BrowserRouter> */}
    </>
  );
};
