import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import defaultAvatar from "../src/assets/defaultAvatar.jpg";

// create a new context
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

// Provider component to wrap around the app and provide state
export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [favouriteMovies, setFavouriteMovies] = useState(
    user?.FavouriteMovies || []
  );

  const fetchUserData = async (token, username) => {
    if (!token || !username) return;
    try {
      const response = await fetch(
        `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("User data could not be fetched");
      }
      const data = await response.json();
      setUser({
        id: data._id,
        Username: data.Username,
        Email: data.Email,
        Birthday: data.Birthday,
        FavouriteMovies: data.FavouriteMovies || [],
        Avatar: data.Avatar || defaultAvatar,
      });
      setFavouriteMovies(data.FavouriteMovies || []);
      // return data;
    } catch (error) {
      console.error("Error fetching user data", error);
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    if (!token || !user?.Username) {
      setUser(null);
      return;
    }
    const getUserData = async () => {
      try {
        await fetchUserData(token, user.Username);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    getUserData();
  }, [token, user?.Username]);

  // update local storage whenever user or token changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setFavouriteMovies(user.FavouriteMovies || []);
    } else {
      localStorage.removeItem("user");
      setFavouriteMovies([]);
    }

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token", token);
    }
  }, [user, token]);

  console.log(user);

  const toggleFavourites = async (movieId) => {
    try {
      if (favouriteMovies.includes(movieId)) {
        const response = await fetch(
          `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to remove from favorites: ${response.statusText}`
          );
        }

        setUser({
          ...user,
          FavouriteMovies: user.FavouriteMovies.filter((id) => id !== movieId),
        });
        toast.success("Movie removed from favorites!", {
          toastId: "success1",
        });
      } else {
        const response = await fetch(
          `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add to favorites: ", response.statusText);
        }

        setUser({
          ...user,
          FavouriteMovies: [...user.FavouriteMovies, movieId],
        });
        toast.success("Movie added to favourites", {
          toastId: "success1",
        });
      }
    } catch (error) {
      toast.error("Failed to update favourites!");
      console.error("Error updating favourites:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setFavouriteMovies([]);
    localStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        favouriteMovies,
        setFavouriteMovies,
        toggleFavourites,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
