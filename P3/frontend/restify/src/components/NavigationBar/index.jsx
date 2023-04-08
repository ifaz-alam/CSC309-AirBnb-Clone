import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import "./index.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => {
  // Initialize state to track whether the dropdown is shown or not
  const [showDropdown, setShowDropdown] = useState(false);
  // Create a ref for the dropdown element to be able to detect clicks outside it
  const dropdownRef = useRef(null);

  // Close the dropdown when a link inside it is clicked
  const handleLinkClick = () => {
    setShowDropdown(false);
  };

  // Add a click event listener to the document to detect clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the dropdown ref exists and the clicked element is not inside the dropdown, close the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Remove the click event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-lightblue">
      <div className="container-fluid">
        <Link className="navbar-brand text-bold" to="/ifaz/navigationbar">
          Restify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/ifaz/properties">
                My Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ifaz/reservations">
                My Reservations
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <div className="dropdown" ref={dropdownRef}>
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="accountDropdown"
                onClick={() => setShowDropdown(!showDropdown)}
                aria-expanded={showDropdown}
              >
                Account
              </button>
              <ul className={`dropdown-menu ${showDropdown ? "show" : ""} dropdown-menu-end`}>
                <li>
                  <Link className="dropdown-item" to="/accounts/login" onClick={handleLinkClick}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/ifaz/logout" onClick={handleLinkClick}>
                    Logout
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/ifaz/profile" onClick={handleLinkClick}>
                    View/Edit Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/accounts/signup" onClick={handleLinkClick}>
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center ms-3">
              <BsBell size={25} />
            </div>
            <div className="ms-3">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  <FiSearch size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
