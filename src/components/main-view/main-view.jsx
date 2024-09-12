import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../userContext";

//import toast
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import { MoviesFromOMDB } from "../moviesOmdb/moviesOmdb";
import Footer from "../footer/footer";

// import components
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; // .jsx format ending not needed here
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

import { AnimatePresence, motion } from "framer-motion";

import Spinner from "../ui/spinner";
import logo4 from "./../navigation-bar/logo4.svg";
import Dropdown from "../ui/dropdown/dropdown";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const { user, setUser, token } = useUserContext();

  // displaying filtered movies from search query
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

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
        setMoviesToRender(moviesFromApi);
        setLoading(false);
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

  return (
    <>
      <AnimatePresence>
        {/* // <BrowserRouter> */}
        <div className="bg-poster"></div>
        <div className="wrapper">
          <div className="left-side">
            <div className="nav">
              <NavigationBar />
            </div>
          </div>

          <div className="right-side">
            <Routes>
              <Route
                path="/apimovies"
                element={
                  user ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MoviesFromOMDB />{" "}
                    </motion.div>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/databases"
                element={
                  user ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Dropdown />
                    </motion.div>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SignupView />
                      </motion.div>
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
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <LoginView />
                      </motion.div>
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
                      {" "}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProfileView movies={movies} />
                      </motion.div>
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
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MovieView movies={movies} />
                      </motion.div>
                    )}
                  </>
                }
              />

              <Route
                path="/"
                element={
                  user ? (
                    <>
                      <form className="CubWrap">
                        <div className="VerticalContainer">
                          <h1 className="CUB">
                            <img
                              as={Link}
                              to="/"
                              src={logo4}
                              style={{ marginRight: 10, width: 30, height: 30 }}
                              width="40"
                              height="40"
                              className="spin-image"
                              alt="React Bootstrap logo"
                            />
                            <span className="heading-color-element blue">
                              C
                            </span>
                            <span className="heading-color-element white">
                              U
                            </span>
                            <span className="heading-color-element green">
                              B
                            </span>{" "}
                            Film Data
                          </h1>
                        </div>
                        <span className="CubDescription">
                          Browse our inhouse database for arthouse classics and
                          save your favorite movies
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

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="moviecard-wrap">
                          {loading ? (
                            <Spinner /> // Show spinner when loading
                          ) : moviesToRender.length > 0 ? (
                            moviesToRender.map((movie) => (
                              <MovieCard
                                key={movie.id}
                                movie={movie}
                                token={token}
                              />
                            ))
                          ) : (
                            <p>No movies found.</p>
                          )}
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </div>
        </div>{" "}
        <Footer />
        {/* </BrowserRouter> */}
      </AnimatePresence>
    </>
  );
};
