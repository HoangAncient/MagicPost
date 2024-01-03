import React from "react";
import Logo from "../../assets/image/magicPost.png";
import "../../assets/css/SearchNavbar.min.css";
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
    const navbarLinks = document.getElementsByClassName("navbarMenu")[0];
    toggleButton.addEventListener("click", () => {
      navbarLinks.classList.toggle("active");
    });
  }, []);
  return (
    <div className="searchNavbar">
      <div className="navbar-logo">
        <img className="logo-image" src={Logo} alt="Logo"></img>
      </div>
      <div class="toggle-button">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <div className="navbarMenu">
        <li className="nav-item">
          <SearchPackage data="Search" />
        </li>
      </div>
    </div>
  );
}

export default Navbar;
