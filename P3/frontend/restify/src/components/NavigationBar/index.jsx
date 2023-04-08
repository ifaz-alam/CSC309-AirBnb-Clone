import React from "react";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import "./index.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Navbar } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-lightblue">
      <div className="container-fluid">
        <Link className="navbar-brand text-bold" to="/ifaz/navigationbar">
          Restify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
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
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="accountDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/accounts/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/ifaz/logout">
                    Logout
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/ifaz/profile">
                    View/Edit Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/accounts/signup">
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
