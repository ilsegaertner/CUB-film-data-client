import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import favouriteMoviesReducer from "./features/favouriteMoviesSlice";

export const store = configureStore({
  reducer: {
    favouriteMovies: favouriteMoviesReducer,
    user: userReducer,
    movies: movieReducer,
  },
});
