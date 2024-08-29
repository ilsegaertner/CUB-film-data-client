import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UpdateUser = ({ user, token }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favouriteMovies, setFavouriteMovies] = useState(user.FavouriteMovies);

  const showToastSuccess = () => {
    toast.info("Your profile was updated.");
  };

  const showToastFail = () => {
    toast.info(
      "Failed to update your profile. Please double-check your information, ensure you are logged in, and try again. If the problem persists, please contact support."
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
          // alert("Your profile was updated.");
          // window.location = "/";
        } else {
          // alert("Form submission failed.");
          showToastFail();
          throw new Error("Form submission failed.");
        }
      })

      .catch((error) => {
        console.error("Error submitting form", error);
        showToastFail();
        // alert(
        //   "Failed to update your profile. Please double-check your information, ensure you are logged in, and try again. If the problem persists, please contact support."
        // );
      });
  };
  console.log(user);

  return (
    <Form onSubmit={handleSubmit} className="updateUser-wrapper">
      <Form.Group>
        <h4>Update your Profile:</h4>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="5"
          placeholder="Enter a username"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
          placeholder="Your Password must be 8 or more characters"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Button
          variant="primary"
          type="submit"
          value="submit"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Form.Group>
    </Form>
  );
};
