import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    Username: "",
    Password: "",
    Birthday: "",
    FavouriteMovies: [],
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
