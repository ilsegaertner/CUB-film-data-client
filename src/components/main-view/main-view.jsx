import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Row, Col, Form, NavbarBrand, ToastContainer } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; // .jsx format ending not needed here
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = ({ movie }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null); //added logic for persisting a Login Session
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovieList, setFavoriteMovieList] = useState(
    user ? user.FavouriteMovies : []
  );
  const [userProfile, setUserProfile] = useState(storedUser || null);
  const [searchQuery, setSearchQuery] = useState("");

  const [showGenreDescription, setShowGenreDescription] = useState(false);
  const [showDirectorBio, setShowDirectorBio] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(favoriteMovieList);

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

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
      });
  }, [token, setFavoriteMovieList]);

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
                    <LoginView onLoggedIn={(user) => setUser(user)} />
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
                    favoriteMovieList={favoriteMovieList}
                    setFavoriteMovieList={setFavoriteMovieList}
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
                      movies={movies}
                      user={user}
                      favoriteMovieList={favoriteMovieList}
                      updateUser={updateUser}
                      token={token}
                      setFavoriteMovieList={setFavoriteMovieList}
                      setUserProfile={setUserProfile}
                      movie={movie}
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
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {filteredMovies.map((movie) => (
                      <Col
                        className="mb-5"
                        key={movie.id}
                        md={11}
                        sm={12}
                        lg={3}
                      >
                        <MovieCard
                          movie={movie}
                          user={user}
                          favoriteMovieList={favoriteMovieList}
                          updateUser={updateUser}
                          token={token}
                          setUserProfile={setUserProfile}
                          setFavoriteMovieList={setFavoriteMovieList}
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
          position="top-center full width"
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
