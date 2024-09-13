import { createSlice } from "@reduxjs/toolkit";

const favouriteMovieSlice = createSlice({
  name: "favouriteMovies",
  initialState: [],
  reducers: {
    addFavouriteMovie: (state, action) => {
      state.push(action.payload);
    },
    removeFavouriteMovie: (state, action) => {
      return state.filter((movieId) => movieId !== action.payload);
    },
  },
});

export const { addFavouriteMovie, removeFavouriteMovie } =
  favouriteMovieSlice.actions;
export default favouriteMovieSlice.reducer;
