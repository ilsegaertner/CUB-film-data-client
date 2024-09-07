import React, { useState, useTransition } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Modal from "../../modal/modal";
import "./dropdown.scss";
import { AnimatePresence, motion } from "framer-motion";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    startTransition(() => {
      navigate(path);
      setIsOpen(false);
    });
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const ombdDirect = () => {
  //   document.documentElement.style.setProperty("--color-main", "#f4f4f4");
  //   document.documentElement.style.setProperty(
  //     "--color-main-transparent",
  //     "#f4f4f480"
  //   );
  //   document.documentElement.style.setProperty("--bg-color", "#191919");
  //   document.documentElement.style.setProperty(
  //     "--bg-color-transparent",
  //     "#19191982"
  //   );

  //   navigate("/apimovies");
  // };

  // const cubDirect = () => {
  //   document.documentElement.style.setProperty("--color-main", "#191919");
  //   document.documentElement.style.setProperty(
  //     "--color-main-transparent",
  //     "#19191982"
  //   );
  //   document.documentElement.style.setProperty("--bg-color", "#f4f4f4");
  //   document.documentElement.style.setProperty(
  //     "--bg-color-transparent",
  //     "#f4f4f480"
  //   );
  //   navigate("/");
  // };

  return (
    <div className="dropdown">
      {/* Button to toggle dropdown visibility */}
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Choose a Film library
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="dropdown-menu">
              {/* Button inside the dropdown */}
              <button
                onClick={() => handleNavigation("/")}
                className="dropdown-item"
              >
                CUB
              </button>
              <button
                onClick={() => handleNavigation("/apimovies")}
                className="dropdown-item"
              >
                OMBD
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
