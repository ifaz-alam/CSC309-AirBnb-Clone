import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import "./index.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAPIContext } from "../../contexts/APIContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";


const NavigationBar = () => {
  let navigate = useNavigate();

  const { user, setUser } = useContext(UserContext); // Global authenticated user state

  // Initialize state to track whether the dropdown is shown or not
  const [showDropdown, setShowDropdown] = useState(false);
  // Create a ref for the dropdown element to be able to detect clicks outside it
  const dropdownRef = useRef(null);

  // Close the dropdown when a link inside it is clicked
  const handleLinkClick = () => {
    setShowDropdown(false);
  };

  // Handle logout to logout the currently authenticated user
  const handleLogout = (event) => {
    event.preventDefault();
    navigate('/');
    localStorage.removeItem("user");
    localStorage.removeItem("pk");
    localStorage.removeItem("Authorization");
    window.location.reload();
    handleLinkClick();
  };


  const handleLogin = (event) => {
    event.preventDefault();
    console.log(user.username);
    if (user.username !== 'Default') {
      navigate(`/accounts/profile/${localStorage.getItem("username")}`);
    }

    else {
      event.preventDefault();
      navigate(`/accounts/login`, {replace : true});
    }

    handleLinkClick();
  };

  const handleViewProfile = (event) => {
    // it's pretty much the same code lol
    handleLogin(event);
  };

  const handleSignupClick = (event) => {
    event.preventDefault();
    console.log(user.username);
    if (user.username !== 'Default') {
      navigate(`/accounts/profile/${localStorage.getItem("username")}`);
    }

    else {
      event.preventDefault();
      navigate(`/accounts/signup`, {replace : true});
    }

    handleLinkClick();
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
        <p><small>User: {user.username}</small></p>
        <Link className="navbar-brand text-bold" to="/">
          Restify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={handleViewProfile}>
                My Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={handleViewProfile}>
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
                {user.username === 'Default' && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="#" onClick={handleLogin}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/accounts/signup" onClick={handleSignupClick}>
                        Create Account
                      </Link>
                    </li>
                  </>
                )}

                {user.username !== 'Default' && (
                  <>
                  <li>
                    <Link className="dropdown-item" to="#" onClick={handleViewProfile}>
                      View/Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                  </>

                )}
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
