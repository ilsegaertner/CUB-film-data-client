import React from "react";

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
