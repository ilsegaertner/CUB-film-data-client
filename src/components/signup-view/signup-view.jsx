import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
      Birthday: birthday
    };

    fetch("https://cub-film-data-dc72bcc7ff05.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <>
      <div>Sign Up: </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="5"
            required
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
        <Form.Label>
          Username:</Form.Label>
          <Form.Control
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            required
          />
        </Form.Group>
        <Form.Group>
        <Form.Label controlId="formBirthday">
          Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" value="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
