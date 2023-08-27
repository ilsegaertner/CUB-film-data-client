import React, { useState } from "react";
import { Form, Button } from "react-bootstrap/Form";

export const UpdateUser = ({ handleSubmit, handleUpdate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => handleUpdate(e)}
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
          onChange={(e) => handleUpdate(e)}
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
          onChange={(e) => handleUpdate(e)}
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
      <Button
        variant="primary"
        type="submit"
        value="submit"
        onClick={handleSubmit}
      >
        Update
      </Button>
    </Form>
  );
};
