import React, { useState, useEffect } from "react";
import "./login-view.scss";
// import { useUserContext } from "../../userContext";
import { useUserContext } from "../../UserContext";

import { useNavigate } from "react-router";

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setToken } = useUserContext();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://cub-film-data-dc72bcc7ff05.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user && data.token) {
          setUser({
            id: data.user._id,
            Username: data.user.Username,
            Email: data.user.Email,
            Birthday: data.user.Birthday,
            FavouriteMovies: data.user.FavouriteMovies,
          });

          setToken(data.token);
          navigate("/");
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch((e) => {
        console.error("Login failed:", e);
        alert(
          "Login failed. Please check your username and password or try again later."
        );
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>
          <label>Login</label>
        </h2>
        <div className="formUsername">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="formPassword">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
