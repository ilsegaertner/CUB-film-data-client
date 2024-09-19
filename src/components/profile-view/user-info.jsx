import React from "react";
import Avatar from "../ui/avatar/avatar";
import userIcon from "../../assets/icons/user.svg";
import emailIcon from "../../assets/icons/mail.svg";


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
          <p>
            <img src={userIcon} width={20} />
            {Username}
          </p>

          <p>
            <img src={emailIcon} width={20} /> {Email}
          </p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
      <hr />
    </div>
  );
};
