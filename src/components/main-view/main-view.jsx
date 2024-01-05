import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col, Form, NavbarBrand, ToastContainer } from "react-bootstrap";

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
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
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
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user), setToken(token);
                      }}
                    />
                  </Col>
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
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      user={user}
                      setUser={setUser}
                      // setUserProfile={setUserProfile}
                      updateUser={updateUser}
                      movies={movies}
                      token={token}
                    />
                  </Col>
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
                    <span className="CUB">CUB Film Data</span>
                  </div>
                  <span className="CubDescription">
                    Browse{" "}
                    <span style={{ fontFamily: "monospace", color: "#43523e" }}>
                      - CUB FILM DATA -
                    </span>{" "}
                    for arthouse classics and look for facts about your favorite
                    movies
                  </span>
                  <Form.Control
                    size="lg"
                    type="text"
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
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {moviesToRender.map((movie) => (
                      <Col
                        className="mb-5"
                        key={movie.id}
                        md={11}
                        sm={12}
                        lg={3}
                      >
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          user={user}
                          updateUser={updateUser}
                          token={token}
                        />
                      </Col>
                    ))}
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
      </Row>
    </BrowserRouter>
  );
};
