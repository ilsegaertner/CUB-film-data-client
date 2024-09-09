import { Link, useNavigate } from "react-router-dom";
import logo4 from "./logo4.svg";
import Modal from "../modal/modal";
import React, { useState, useTransition } from "react";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

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

  const handleNavigation = (path) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div className="nav-wrapper">
      <img
        // as={Link}
        onClick={() => handleNavigation("/")}
        to="/"
        src={logo4}
        alt="Cub Film-Data logo"
        width="40"
        height="40"
        className="spin-image"
      />

      <div id="navbar-links">
        {!user && (
          <>
            <button
              className="navigation-link-button"
              onClick={() => handleNavigation("/login")}
            >
              Login
            </button>
            <button
              className="navigation-link-button"
              onClick={() => handleNavigation("/signup")}
            >
              Signup
            </button>
          </>
        )}
        {user && (
          <>
            <button
              className="navigation-link-button"
              onClick={() => handleNavigation("/")}
            >
              Home
            </button>
            <button
              className="navigation-link-button"
              onClick={() => handleNavigation("/profile")}
            >
              Profile
            </button>
            <button
              className="navigation-link-button"
              onClick={() => handleNavigation("/databases")}
            >
              Libraries
            </button>
            <button
              className="navigation-link-button"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
            <Modal show={showLogoutModal} onClose={handleCancelLogout}>
              <div>
                <h2>Confirm Logout</h2>
                <p className="logout-question-paragraph">
                  Are you sure you want to log out?
                </p>
                <div className="modal-actions">
                  <button
                    onClick={handleCancelLogout}
                    className="modal-button-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmLogout}
                    className="modal-button-confirm"
                  >
                    Yes, Logout
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
