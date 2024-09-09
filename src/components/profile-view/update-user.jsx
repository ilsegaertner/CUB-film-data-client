import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UpdateUser = ({ user, token }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favouriteMovies, setFavouriteMovies] = useState(user.FavouriteMovies);

  const showToastSuccess = () => {
    toast.success("Your profile was updated.");
  };

  const showToastFail = () => {
    toast.error(
      "Failed to update your profile. Please double-check and fill out all your new details and information, ensure you are logged in, and try again. If the problem persists, please contact support."
    );
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      showToastFail("Invalid email address.");
      return;
    }

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      FavouriteMovies: favouriteMovies,
    };

    if (!user.Username || !user.Email) {
      alert("Username and Email are required.");
      return;
    }

    fetch(
      `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        console.log(data);
        if (response.ok) {
          showToastSuccess();
        } else {
          showToastFail();
          throw new Error("Form submission failed.");
        }
      })

      .catch((error) => {
        console.error("Error submitting form", error);
        showToastFail();
      });
  };
  console.log(user);

  return (
    <form onSubmit={handleSubmit} className="updateUser-wrapper">
      <h4>Update your Profile</h4>

      <div>
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
      <div>
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
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div>
        <label>Birthday:</label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </div>
      <div>
        <button variant="primary" type="submit" value="submit">
          Update
        </button>
      </div>
      <hr />
    </form>
  );
};
