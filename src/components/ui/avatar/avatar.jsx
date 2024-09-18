import { useState } from "react";
import defaultAvatar from "../../../assets/defaultAvatar.jpg";
import Spinner from "../spinner";
import "./avatar.scss";
import { useUserContext } from "../../../UserContext";

const Avatar = () => {
  const { user } = useUserContext();
  const { Username } = user || {};

  const initials = Username
    ? Username.split(" ")
        .map((name) => name[0].toUpperCase())
        .join("")
    : "";
  const [avatar, setAvatar] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoadAvatar = (event) => {
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
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        setError("");
        setLoading(false);
      };
      reader.readAsDataURL(file);
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
            <p>Hello {initials}</p>
          )}

          <input
            type="file"
            id="file-input"
            accept="image/*"
            className="avatar-input"
            onChange={handleLoadAvatar}
          />
          {avatar ? (
            <label htmlFor="file-input" className="custom-file-upload">
              Change image
            </label>
          ) : (
            <label htmlFor="file-input" className="custom-file-upload">
              Upload An Avatar
            </label>
          )}

          {error && <p className="error">{error}</p>}
        </>
      )}
    </div>
  );
};

export default Avatar;
