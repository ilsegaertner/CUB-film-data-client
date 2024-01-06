import React from "react";
import { Card } from "react-bootstrap";

export const UserInfo = ({ user }) => {
  const { Username, Email } = user;

  return (
    <Card>
      <Card.Body>
        <h4 style={{ textDecoration: "underline" }}>My info</h4>
        <br></br>
        <p>Name: {Username}</p>
        <p>E-mail: {Email}</p>
      </Card.Body>
    </Card>
  );
};
