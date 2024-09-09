import { User } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

// create a new context
const UserContext = createContext();

// Custom hook to use the context easily in components
export const useUserContext = () => useContext(UserContext);

// Provider component to wrap around the app and provide state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  return (
    <UserContext.Provider
      value={{ user, setUser, favouriteMovies, setFavouriteMovies }}
    >
      {children}
    </UserContext.Provider>
  );
};
