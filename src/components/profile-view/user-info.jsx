import React from "react";
import { Card } from "react-bootstrap";

export const UserInfo = ({ email, name }) => {
  return (
    <Card>
      <Card.Body>
        <h4>Your Info</h4>
        <p>Name: {name}</p>
        <p>e-mail: {email}</p>
      </Card.Body>
    </Card>
  );
};
