import { useState } from "react";
import defaultAvatar from "../../../assets/defaultAvatar.jpg";
import Spinner from "../spinner";
import "./avatar.scss";
import { useUserContext } from "../../../UserContext";
import imageUploadIcon from "../../../assets/icons/image-up.svg";

const Avatar = () => {
  const { user, setUser, token, avatar, setAvatar } = useUserContext();
  const { Username } = user || {};

  // const initials = Username
  //   ? Username.split(" ")
  //       .map((name) => name[0].toUpperCase())
  //       .join("")
  //   : "";
  // const [avatar, setAvatar] = useState(
  //   user?.Avatar ? `data:image/*;base64,${user.Avatar}` : defaultAvatar
  // );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoadAvatar = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      setError("");

      const fileType = file.type.split("/")[1];
      const validTypes = ["jpeg", "webp", "jpg", "png"];

      if (!validTypes.includes(fileType)) {
        setError(
          "Invalid file type. Please select a JPEG, PNG, or WebP image."
        );
        setLoading(false);
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("Avatar", file);

      try {
        const response = await fetch(
          `https://cub-film-data-dc72bcc7ff05.herokuapp.com/users/${user.Username}/avatar`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload avatar");
        }

        const updatedUser = await response.json();

        const newAvatar = updatedUser.Avatar
          ? `data:image/*;base64,${updatedUser.Avatar}`
          : defaultAvatar;

        setAvatar(newAvatar);
        setUser(updatedUser);
        setError("");
      } catch (error) {
        console.error("Error uploading avatar:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }

      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     const newAvatar = reader.result;
      //     setAvatar(newAvatar);
      //     setUser((prevUser) => ({ ...prevUser, Avatar: newAvatar }));
      //     setError("");
      //     setLoading(false);
      //   };
      //   reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-upload">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {avatar ? (
            <img src={avatar} alt="User Avatar" className="avatar-preview" />
          ) : (
            <img src={defaultAvatar} />
          )}

          <input
            type="file"
            id="file-input"
            accept="image/*"
            className="avatar-input"
            onChange={handleLoadAvatar}
          />
          <label htmlFor="file-input" className="custom-file-upload">
            <img src={imageUploadIcon} width={20} alt="upload-icon" />
          </label>

          {error && <p className="error">{error}</p>}
        </>
      )}
    </div>
  );
};

export default Avatar;
