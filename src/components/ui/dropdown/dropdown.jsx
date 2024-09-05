import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./dropdown.scss";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const ombdDirect = () => {
    document.documentElement.style.setProperty("--color-main", "#f4f4f4");
    document.documentElement.style.setProperty(
      "--color-main-transparent",
      "#f4f4f480"
    );
    document.documentElement.style.setProperty("--bg-color", "#191919");
    document.documentElement.style.setProperty(
      "--bg-color-transparent",
      "#19191982"
    );

    navigate("/apimovies");
  };

  const cubDirect = () => {
    document.documentElement.style.setProperty("--color-main", "#191919");
    document.documentElement.style.setProperty(
      "--color-main-transparent",
      "#19191982"
    );
    document.documentElement.style.setProperty("--bg-color", "#f4f4f4");
    document.documentElement.style.setProperty(
      "--bg-color-transparent",
      "#f4f4f480"
    );
    navigate("/");
  };

  return (
    <div className="dropdown">
      {/* Button to toggle dropdown visibility */}
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Choose a Film library
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="dropdown-menu">
          {/* Button inside the dropdown */}
          <button onClick={cubDirect} className="dropdown-item">
            CUB
          </button>
          <button onClick={ombdDirect} className="dropdown-item">
            OMBD
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
