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
      document.documentElement.style.setProperty(
        "--color-main-transparent",
        "#f4f4f480"
      );
      document.documentElement.style.setProperty("--bg-color", "#191919");
      document.documentElement.style.setProperty(
        "--bg-color-transparent",
        "#19191982"
      );
    } else {
      document.documentElement.style.setProperty("--color-main", "#191919");
      document.documentElement.style.setProperty(
        "--color-main-transparent",
        "#19191982"
      );
      document.documentElement.style.setProperty("--bg-color", "#f4f4f4");
      document.documentElement.style.setProperty(
        "--bg-color-transparent",
        "#f4f4f480"
      );
    }
  };

  return (
    <>
      {/* // <BrowserRouter> */}
      <div className="bg-poster"></div>
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
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="svg"
            width="60%"
            height="466.77877"
            viewBox="0 0 463.99206 466.77877"
          >
            <path
              d="M88.49769,448.81027c-2.06592,.12937-3.20768-2.43737-1.64468-3.93333l.1555-.61819c-.02047-.04951-.04105-.09897-.06178-.14839-2.08924-4.9818-6.87922,4.28984-8.95069,9.27903-1.83859,4.42817-6.47012-.37337-7.04649,4.30868-.25838,2.0668-.14213,4.17236,.31648,6.20047-4.30807-9.41059-6.57515-19.68661-6.57515-30.02077,0-2.59652,.14213-5.19301,.43275-7.78295,.239-2.11854,.56839-4.2241,.99471-6.31034,2.30575-11.2772,7.29852-22.01825,14.50012-30.98962,3.46197-1.89248,6.34906-4.85065,8.09295-8.39652,.62649-1.27891-3.94789-2.60741-3.71537-4.00896-.39398,.05168,3.57972-5.99588,3.87688-6.36402-.54906-.83317-1.53178-1.24733-2.13144-2.06034-2.98232-4.04341-7.0912-3.33741-9.23621,2.15727-4.58224,2.31266-4.62659,6.14806-1.81495,9.83683,1.78878,2.34682,2.03456,5.52233,3.60408,8.03478-.16151,.20671-.32944,.40695-.4909,.61366-2.96106,3.79788-5.52208,7.88002-7.68104,12.16859,.61017-4.76621-.29067-10.50822-1.82641-14.20959-1.74819-4.21732-5.02491-7.76915-7.91045-11.41501-3.46601-4.37924-10.57337-2.46806-11.18401,3.08332-.00591,.05375-.01166,.10745-.01731,.1612,.4286,.24178,.84849,.49867,1.25864,.76992,2.33949,1.54723,1.53096,5.17386-1.24107,5.60174l-.06277,.00967c.15503,1.54366,5.46945,10.10703,5.85695,11.61197-3.70179,14.31579-.7595,12.4973,10.65186,12.73153,.25191,.12916,.49738,.25832,.74929,.38109-1.15617,3.25525-2.07982,6.59447-2.76441,9.97891-.61359,2.99043-1.03991,6.01317-1.27885,9.04888-.29715,3.83006-.27129,7.67959,.05168,11.50323l-.01939-.13562c-.82024-4.21115-3.10671-8.14462-6.4266-10.87028-4.94561-4.06264-11.93282-5.55869-17.26826-8.82425-2.56833-1.57196-5.85945,.45945-5.41121,3.43708l.02182,.14261c.79443,.32289,1.56947,.69755,2.31871,1.11733,.4286,.24184,.84848,.49867,1.25864,.76992,2.33949,1.54729,1.53096,5.17392-1.24107,5.6018l-.06282,.00965c-.0452,.00646-.08397,.01295-.12911,.01944,1.36282,3.23581,11.17287,.4987,13.54973,3.0887,2.31463,12.49713,4.34484,19.42335,14.97904,15.78406h.00648c1.16259,5.06378,2.86128,10.01127,5.0444,14.72621h18.02019c.06463-.20022,.12274-.40692,.18089-.60717-1.6664,.10341-3.34571,.00649-4.98629-.29702,1.33701-1.64059,2.67396-3.29409,4.01097-4.93462,.03229-.0323,.05816-.0646,.08397-.09689,.67817-.8396,1.36282-1.67283,2.04099-2.51246l.00036-.00102c.04245-2.57755-.26652-5.14662-.87876-7.63984l-.00057-.00035Z"
              fill="#f2f2f2"
            />
            <path
              d="M233.41986,25.88011c-1.65616,6.97284,7,6,3,19,0,7.46237-9.53763,7-17,7h-29c-5.01717,.31695-15.73673-1.0271-15-6l4-10c1.48068-5.6197-5.12003-5.99504-5.02496-11.80575,.10192-6.22936,6.08804-12.03925,8.02496-16.19425,1.92642-4.13248,5.30576-7.75983,14-7,2.97589,.26008,12.02322-.75415,14.92782-.05627h.00002c5.21009,1.25182,10.12152,3.52068,14.45216,6.67626h0c2.28003,2.27002,4.13,4.95997,5.44,7.95002,1.22998,2.79999,1.97998,5.87,2.15002,9.08997v.03003c.01996,.44,.02997,.87,.02997,1.31Z"
              fill="#2f2e41"
            />
            <g>
              <polygon
                points="178.96621 442.98553 188.53679 443.21138 193.87159 400.21436 179.74782 399.88012 178.96621 442.98553"
                fill="#ffb6b6"
              />
              <path
                d="M211.80165,462.95264h0c0,1.61678-1.14736,2.92746-2.56272,2.92746h-18.99679s-1.86944-7.51466-9.49144-10.74863l-.52605,10.74863h-9.79978l1.18735-17.2833s-2.62149-9.24663,2.82279-13.97324c5.44434-4.72661,1.03463-4.06863,1.03463-4.06863l2.1417-10.69706,14.80852,1.74139,.10888,16.79188,7.18647,16.6675,10.54081,5.20699c.93818,.46343,1.54551,1.51939,1.54551,2.68698l.00012,.00003Z"
                fill="#2f2e41"
              />
            </g>
            <g>
              <polygon
                points="125.31752 395.47407 132.36636 401.95179 164.71734 373.13133 154.31564 363.57115 125.31752 395.47407"
                fill="#ffb6b6"
              />
              <path
                d="M136.8518,432.13211h0c-1.0656,1.21592-2.79235,1.44543-3.85679,.51258l-14.28682-12.52057s3.54689-6.88363-.05388-14.33937l-7.47993,7.73695-7.37007-6.45893,12.2842-12.2156s4.12282-8.68186,11.33253-8.64832c7.20975,.03358,3.4597-2.37797,3.4597-2.37797l8.66101-6.63331,9.98924,11.06977-10.98545,12.70035-5.58068,17.27157,4.49551,10.86333c.40013,.96688,.16091,2.16131-.60863,3.03941l.00007,.0001Z"
                fill="#2f2e41"
              />
            </g>
            <path
              d="M180.41986,145.88011s2,15-10,27l41,16,30-11s-11-23-6-30l-55-2Z"
              fill="#ffb6b6"
            />
            <path
              d="M222.41986,53.88011l-29.5,2.5h-.00002c-13.07943,8.71964-20.79749,23.51716-20.4631,39.23312l.11195,5.26186c.18784,8.82865,1.07141,17.62368,2.50206,26.33767,1.20713,7.35254,7.34911,32.66735-5.65089,45.66735l68-10s-6-16,2.21777-34.79584c5.16664-11.81724,2.79946-25.64206,1.43511-38.46703l-2.15288-20.23712-16.5-15.5Z"
              fill="#6c63ff"
            />
            <g>
              <path
                d="M339.75449,94.40466c-2.07003,.90807-3.76333,2.2084-4.90247,3.63589l-20.26615,7.40501,3.8057,9.54037,20.14824-8.53884c1.82178,.12863,3.92527-.23662,5.9953-1.14469,4.72897-2.07449,7.49235-6.19573,6.17221-9.20506-1.32014-3.00933-6.22386-3.76717-10.95282-1.69268h-.00001Z"
                fill="#ffb6b6"
              />
              <path
                d="M229.41986,67.38011s6.20472-6,15.60236-1,39.39764,45,39.39764,45l43-13,5.2874,13-54.2874,21-49-45.52362v-19.47638Z"
                fill="#6c63ff"
              />
            </g>
            <circle cx="210.59142" cy="27.19304" r="20.83084" fill="#ffb6b6" />
            <path
              d="M236.41986,23.88011c-.78998,1.14001-4.98382-3.03076-11.42383-3.49072-1.64001-.12-5.33618,5.41071-9.57617,5.49072-2.81,.04999-4.53998,.02997-8,0-4.08997-.04004-5.20996-.12-6-1-1.52997-1.71002-.26996-4.75-1-5-.60999-.21002-2.19,1.66998-3,4-1.70001,4.89001,4.40002,11.70001,5,18,.64001,6.78998-5.65997-6.22003-5,0,.73999,7,3.39001,6.46997,3.35999,9-.00995,.38-.12,.70996-.35999,1-.20996,.26001-.41998,.35999-4,1-4.27997,.76996-6.42999,1.14996-7,1-1.46997-.38-2.96002-2.48999-4-4-1.72003-2.47003-.5,.01996,0-3,.48004-2.92004,1.98004-3.29999,2-6,.02002-3.40002-2.34998-4.42999-4-8-3.04999-6.60004-.07001-14.23999,1-17,.51389-1.3236,1.44601-2.99879,3.0796-5.76657,1.31144-2.22197,3.052-4.17932,5.17476-5.64591,3.18156-2.19811,6.87685-3.70425,10.87238-4.30104,2.1885-.32688,4.41977-.15522,6.57131,.36174l5.57333,1.33912c2.34266,.56287,4.55104,1.58304,6.49826,3.00191h0c1.81493,.00604,3.38873,1.17908,4.01102,2.884,.06512,.17842,.12438,.28235,.17315,.2671,10.04618-3.14035,10.03943,6.16082,9.92927,11.97116-.01127,.59469,.01006,1.12097,.08694,1.54847v.03003c.20001,1.14996,.25,1.98999,.02997,2.31Z"
              fill="#2f2e41"
            />
            <path
              d="M238.41986,166.88011s-11,23-68,3c-7.85809-.45677-12.4227,77.74292-2,117,10.12549,38.13757,8.5,123.5,8.5,123.5l18-1,14.5-115.5-3.5-54.5,10,68-72,62,11,17,96-67s10-120-12.5-152.5Z"
              fill="#2f2e41"
            />
            <path
              d="M0,465.58877c0,.66003,.53003,1.19,1.19006,1.19H362.48004c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H1.19006c-.66003,0-1.19006,.53003-1.19006,1.19Z"
              fill="#ccc"
            />
            <g>
              <path
                d="M391.60895,209.43227l21.06582-9.979c-8.64027,12.0581-16.08538,30.89015-20.07126,45.87552-6.74864-13.95894-17.62768-31.03873-28.39626-41.24113l22.26426,5.72768c-13.71913-67.23708-65.32031-115.50667-124.41081-115.50667l-.83648-2.42862c61.72156,0,116.37705,47.60048,130.38474,117.55221Z"
                fill="#3f3d56"
              />
              <path
                d="M320.65093,311.88011h133.10247c5.64551,0,10.23865-4.59315,10.23865-10.23865,0-5.64551-4.59315-10.23865-10.23865-10.23865h-133.10247c-5.64551,0-10.23865,4.59315-10.23865,10.23865,0,5.64551,4.59315,10.23865,10.23865,10.23865Z"
                fill="#6c63ff"
              />
            </g>
            <g>
              <path
                d="M282.75449,94.40466c-2.07003,.90807-3.76333,2.2084-4.90247,3.63589l-20.26615,7.40501,3.8057,9.54037,20.14824-8.53884c1.82178,.12863,3.92527-.23662,5.9953-1.14469,4.72897-2.07449,7.49235-6.19573,6.17221-9.20506-1.32014-3.00933-6.22386-3.76717-10.95282-1.69268h-.00001Z"
                fill="#ffb6b6"
              />
              <path
                d="M172.41986,75.69853c0-7.87084,8.31635-13.05394,15.32139-9.46513,.09333,.04782,.18699,.09672,.28097,.14672,9.39764,5,39.39764,45,39.39764,45l43-13,5.2874,13-54.2874,21-45.55944-42.32716c-2.19401-2.03835-3.44056-4.89797-3.44056-7.89273v-6.4617Z"
                fill="#6c63ff"
              />
            </g>
            <g>
              <path
                d="M384.71882,361.5586c-7.91992,0-14.36328-6.44336-14.36328-14.36377,0-7.91992,6.44336-14.36328,14.36328-14.36328,7.92041,0,14.36377,6.44336,14.36377,14.36328,0,7.92041-6.44336,14.36377-14.36377,14.36377Zm0-26.72705c-6.81689,0-12.36328,5.54639-12.36328,12.36328,0,6.81738,5.54639,12.36377,12.36328,12.36377,6.81738,0,12.36377-5.54639,12.36377-12.36377,0-6.81689-5.54639-12.36328-12.36377-12.36328Z"
                fill="#3f3d56"
              />
              <path
                d="M381.83986,353.81534c-.27246,0-.54395-.11084-.74121-.32861-.37109-.40967-.33984-1.04199,.07031-1.4126l5.54883-5.02441-5.02344-5.54883c-.37109-.40918-.33887-1.0415,.07031-1.41211s1.04199-.33936,1.41211,.07031l5.69434,6.29004c.37109,.40918,.33984,1.0415-.07031,1.41211l-6.29004,5.69531c-.19141,.17334-.43164,.25879-.6709,.25879Z"
                fill="#3f3d56"
              />
            </g>
            <path
              d="M182.26774,18.23408c-4.68517-1.30478-7.42551-6.16058-6.12074-10.84575,1.30478-4.68517,6.16058-7.42551,10.84575-6.12074,4.68517,1.30478,8.10427,9.34774,3.29299,10.05825-5.71995,.84469-3.33284,8.21302-8.018,6.90824Z"
              fill="#2f2e41"
            />
          </svg> */}
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
                      <h1 className="CUB">
                        <span className="heading-color-element blue">C</span>
                        <span className="heading-color-element white">U</span>
                        <span className="heading-color-element green">
                          B
                        </span>{" "}
                        Film Data
                      </h1>
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
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg"
                width={20}
              />
            </a>
            <a href="">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                width={20}
              />
            </a>
            <a href="">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg"
                width={20}
              />
            </a>
          </div>
        </div>
      </section>
      {/* </BrowserRouter> */}
    </>
  );
};
