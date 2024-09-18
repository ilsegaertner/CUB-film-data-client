import React from "react";
import Avatar from "../ui/avatar/avatar";

// import { useUserContext } from "../../userContext";
import { useUserContext } from "../../UserContext";

export const UserInfo = () => {
  const { user } = useUserContext();
  const { Username, Email } = user || {};

  return (
    <div className="user-info">
      <h4>Your Info</h4>
      {user ? (
        <>
          <Avatar />
          <p>Name: {Username}</p>

          <p>E-mail: {Email}</p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
      <hr />
    </div>
  );
};
