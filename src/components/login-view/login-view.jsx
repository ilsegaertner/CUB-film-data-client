import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behaviour of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      access: username,
      secret: password,
    };

    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/login?Username=${username}&Password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: " + data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user)); //Persisting a Login Session via local storage
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert(
          "Login failed. Please check your username and password or try again later."
        );
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>Login:</label>
        </div>
        <div className="mb-3" controlId="formUsername">
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
        <div className="mb-3" controlId="formPassword">
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
        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
