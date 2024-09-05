import React, { useState } from "react";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://cub-film-data-dc72bcc7ff05.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location = "/login";
      } else {
        alert(
          "Signup failed. Please check your information or try again later."
        );
      }
    });
  };

  return (
    <>
      <div className="signup-wrapper">
        <div>
          <form onSubmit={handleSubmit} className="login-form">
            <h2>
              <label>Please register</label>
            </h2>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />

            <div className="formUsername">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="5"
                placeholder="Enter a username"
                required
              />
            </div>
            <div className="formUsername">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                placeholder="Your Password must be 8 or more characters"
                required
              />
            </div>

            <div className="formBirthday">
              <label>Birthday:</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
            <button type="submit" value="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
