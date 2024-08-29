import { Link } from "react-router-dom";
import logo4 from "./logo4.svg";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <div className="nav-wrapper">
      <img
        as={Link}
        to="/"
        src={logo4}
        width="40"
        height="40"
        className="d-inline-block align-right"
        alt="React Bootstrap logo"
      />

      <div id="navbar-links">
        {!user && (
          <>
            <Link as={Link} to="/login">
              Login
            </Link>
            <Link as={Link} to="/signup">
              Signup
            </Link>
          </>
        )}
        {user && (
          <>
            <Link as={Link} to="/">
              Home
            </Link>
            <Link as={Link} to="/profile">
              Profile
            </Link>
            <Link onClick={onLoggedOut}>Logout</Link>
          </>
        )}
      </div>
    </div>
  );
};
