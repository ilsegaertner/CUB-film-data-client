import React from "react";

export const UserInfo = ({ user }) => {
  const { Username, Email } = user;

  return (
    <div className="user-info">
      <h4>Your Info</h4>
      <p>Name: {Username}</p>
      <p>E-mail: {Email}</p>
    </div>
  );
};
