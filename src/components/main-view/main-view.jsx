import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Row, Col, Form, NavbarBrand, ToastContainer } from "react-bootstrap";
import { Form, ToastContainer } from "react-bootstrap";

//import toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import components
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; // .jsx format ending not needed here
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Form } from "react-bootstrap";
import FavMovies from "../profile-view/favorite-movies";

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
  const filteredMovies = moviesToRender.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //style of searchbar
  const searchbarStyle = {
    boxShadow: "0px 1px 4px #dbdbdb",
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

  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="nav">
          <NavigationBar user={user} onLoggedOut={onLoggedOut} />
          {/* <FavMovies user={user} movies={movies} /> */}
        </div>

        <div className="">
          <Routes>
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
                  <form className="CubWrap">
                    <div className="VerticalContainer">
                      <h1 className="CUB">CUB Film Data</h1>
                    </div>
                    <span className="CubDescription">
                      Browse our database for arthouse classics and save your
                      favorite movies
                    </span>
                  </form>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <div>The list is empty!</div>
                  ) : (
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
                  <Form className="CubWrap">
                    <div className="VerticalContainer">
                      <h1 className="CUB">CUB Film Data</h1>
                    </div>
                    <span className="CubDescription">
                      Browse our database for arthouse classics and save your
                      favorite movies
                    </span>
                    <Form.Control
                      size="lg"
                      type="text"
                      style={searchbarStyle}
                      placeholder="Search movies..."
                      class="bg-body-tertiary navbar navbar-expand-lg navbar-light searchMovies form-control-lg mr-sm-2"
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
                  </Form>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : moviesToRender.length === 0 ? (
                    <div>The list is empty!</div>
                  ) : (
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
    </BrowserRouter>
  );
};
