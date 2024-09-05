import { Link } from "react-router-dom";
import logo4 from "./logo4.svg";
import Modal from "../modal/modal";
import React, { useState } from "react";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    onLoggedOut();
    setShowLogoutModal(false);
  };
  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="nav-wrapper">
      <Link to="/">
        <img
          as={Link}
          to="/"
          src={logo4}
          width="40"
          height="40"
          className="spin-image"
          alt="React Bootstrap logo"
        />
      </Link>

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
            <Link as={Link} to="/databases">
              Libraries
            </Link>
            <Link onClick={handleLogoutClick}>Logout</Link>
            <Modal show={showLogoutModal} onClose={handleCancelLogout}>
              <div>
                <h2>Confirm Logout</h2>
                <p className="logout-question-paragraph">Are you sure you want to log out?</p>
                <div className="modal-actions">
                  <button
                    onClick={handleConfirmLogout}
                    className="modal-button"
                  >
                    Yes, Logout
                  </button>
                  <button onClick={handleCancelLogout} className="modal-button">
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};
