import React from "react";
import Logo from "../../assets/image/magicPost.png";
import "../../assets/css/CustomerNavbar.min.css";
import SearchPackage from "../searchPackage/SearchPackage.js";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useEffect } from "react";
function Navbar() {
  useEffect(() => {
    const toggleButton = document.getElementsByClassName("toggle-button")[0];
    const navbarLinks = document.getElementsByClassName("navbar-menu")[0];
    toggleButton.addEventListener("click", () => {
      navbarLinks.classList.toggle("active");
    });
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img className="logo-image" src={Logo} alt="Logo"></img>
      </div>
      <div class="toggle-button">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <div className="navbar-menu">
        <ul>
          <li className="nav-item">
            <Link to="/">HOME</Link>
          </li>
          <li className="nav-item">
            <Link to="/serviceInfo">SERVICE</Link>
          </li>
          <li className="nav-item">
            <Link to="/">ABOUT US</Link>
          </li>
          <li className="nav-item">
            <Link to="/">SUPPORT</Link>
          </li>
          <li className="nav-item">
            <Link to="/login">STAFF ONLY</Link>
          </li>
          <li className="nav-item">
            <SearchPackage data="Customer" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
