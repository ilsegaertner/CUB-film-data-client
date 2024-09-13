import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    setMovies: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
  