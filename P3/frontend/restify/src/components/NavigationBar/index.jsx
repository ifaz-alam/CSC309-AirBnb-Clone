import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import "./index.css";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAPIContext } from "../../contexts/APIContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const NotificationCounter = () => {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


  
  let APIURL = "http://localhost:8000";

  console.log(`use effect called in navigationbar`);
  useEffect(() => {
    let temp = 0;
    const fetchNotifications = async () => {
      let response = await fetch(`${APIURL}/notifications/get/`, {
        method: "POST",
        headers: {
					"Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
				},
				body: JSON.stringify({
					all: true,
					username: localStorage.getItem("username"),
				}),
      });
      let data = await response.json();
      
      // Check if there are more pages
      console.log(`incoming notifications with length ${data.length}`);
      console.log(data);
      temp += data.length;
      
      let tempNotifications = [...data];
      // Loop through the rest of the pages as long as they are valid
      let i = 2;
      let totalNotifications = [];
      let hasMore = true;
      
      while (hasMore) {
        console.log('CHECKING FOR MORE!');
        let response = await fetch(`${APIURL}/notifications/get/?page=${i}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("Authorization"),
          },
          body: JSON.stringify({
            all: true,
            username: localStorage.getItem("username"),
          }),
        });
      
        if (!response.ok) {
          console.error("NO MORE PAGES LEFT!");
          break;
        }
        
        const data = await response.json();
        console.log(`CHECKING THE ${i}'th page!`);
        console.log(data);
      
        if (data.detail === "Invalid page.") {
          // Reached the end of the pages
          hasMore = false;
        } else {
          // Append the notifications from the current page to the array
          temp += data.length;
          tempNotifications.push(...data);
        }
        
        i++;
      }
      
      console.log(`Total notifications: ${totalNotifications.length}`);
      

      setCount(temp);
      // reverse the array so the most recent notifications appear first
      tempNotifications.reverse();
      setNotifications(tempNotifications);
      
    };

    fetchNotifications();
  }, []);

  const NotificationDropdown = () => {
    return (
      <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? "show" : ""}`} aria-labelledby="navbarDropdown">
        {notifications.map(notification => (
          <li key={notification.id}>
            <Link className="dropdown-item" to={notification.link}>
              <small>{notification.message}</small>
            </Link>
          </li>
        ))}
      </ul>
    );
  };
  
  
  return (
    <div className="position-relative">
      <BsBell size={25} onClick={() => setShowDropdown(!showDropdown)}/>
      {count > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {count}
        </span>
      )}
      {showDropdown && <NotificationDropdown />}
    </div>
  );
};


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
    localStorage.setItem("username", "Default");
    localStorage.setItem("pk", -1);
    localStorage.setItem("Authorization", "None");
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
        <div className="collapse navbar-collapse dropdown-menu-end" id="navbarSupportedContent">
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
                {localStorage.getItem("username") === 'Default' && (
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

                {localStorage.getItem("username") !== 'Default' && (
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
            {localStorage.getItem("username") !== 'Default' && (
              <div className="d-flex align-items-center ms-3">
                <NotificationCounter />
              </div>
            )}
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
