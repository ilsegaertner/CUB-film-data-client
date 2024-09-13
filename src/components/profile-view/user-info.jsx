import React from "react";

import { useUserContext } from "../../userContext";

export const UserInfo = () => {
  const { user } = useUserContext();
  const { Username, Email } = user || {};

  console.log("UserInfoUser:", user);

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
