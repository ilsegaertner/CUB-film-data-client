import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../userContext";

export const UpdateUser = () => {
  const { user, token, setUser } = useUserContext();

  // Initialize local state with user context values
  const [username, setUsername] = useState(user?.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday || "");

  // Effect to keep form values in sync when user changes
  useEffect(() => {
    if (user) {
      setUsername(user.Username || "");
      setEmail(user.Email || "");
      setBirthday(user.Birthday || "");
    }
  }, [user]);

  const showToastSuccess = () => {
    toast.success("Your profile was updated.");
  };

  const showToastFail = () => {
    toast.error(
      "Failed to update your profile. Please double-check and fill out all your new details and information, ensure you are logged in, and try again. If the problem persists, please contact support."
    );
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      showToastFail("Invalid email address.");
      return;
    }

    const data = {
      Username: username,
      Password: password || undefined, // Send password only if provided
      Email: email,
      Birthday: birthday,
    };

    if (password) {
      data.Password = password;
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
          return response.json();
          // showToastSuccess();
        } else if (response.status === 400) {
          showToastFail(
            "Invalid data provided. Please check the form and try again."
          );
          throw new Error("Validation failed");
        } else if (response.status === 401) {
          showToastFail("You are not authorized to perform this action.");
          throw new Error("Unauthorized access");
        } else if (response.status === 500) {
          showToastFail("A server error occurred. Please try again later.");
          throw new Error("Server error");
        } else {
          showToastFail("Failed to update profile. Please try again.");
          throw new Error("Unknown error");
        }
      })
      .then((updatedUser) => {
        // Update the user in the context with new values
        setUser({
          ...user,
          Username: updatedUser.Username,
          Email: updatedUser.Email,
          Birthday: updatedUser.Birthday,
        });
        showToastSuccess();
      })
      .catch((error) => {
        console.error("Error updating profile", error);
        showToastFail();
      });
  };
  console.log(user);

  return (
    <form onSubmit={handleSubmit} className="updateUser-wrapper">
      <h4>Update your Profile</h4>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="5"
          placeholder="Enter a username"
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
          placeholder="Your Password must be 8 or more characters"
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div>
        <label>Birthday:</label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </div>
      <div>
        <button variant="primary" type="submit" value="submit">
          Update
        </button>
      </div>
      <hr />
    </form>
  );
};
