import React, { useEffect, useState } from "react";
import axiosInstance from "./axios/Instance";
import { useNavigate } from "react-router-dom";
import "../assets/css/LoginPage.min.css";
import { Link } from "react-router-dom";
import loginImage from "../assets/image/loginPicture.png";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      // Handle the response from the backend if needed
      if (response.data.status === 200) {
        setContent("");
        localStorage.setItem("token", response.data.jwt);
        if (response.data.role == "ceo") {
          navigate("/admin");
        } else if (response.data.role == "manager_gather") {
          navigate("/managerGather");
        } else if (response.data.role == "manager_exchange") {
          navigate("/managerExchange");
        } else if (response.data.role == "employee_gather") {
          navigate("/employeeGather");
        } else if (response.data.role == "employee_exchange") {
          navigate("/employeeExchange");
        } else {
          navigate("/");
        }
      }
      console.log("Response from server:", response.data);
    } catch (error) {
      // Handle errors
      const status = error.response.status;
      console.log(error.response.status);
      if (status == 404) {
        setContent("User not found");
      } else if (status == 400) {
        setContent("Invalid email or password");
      }
      console.error("Error occurred:", error);
    }
  }

  return (
    <div className="LoginPage">
      <div className="loginContainer">
        <div className="imgContainer">
          <img src={loginImage} alt="" />
        </div>

        <form className="loginForm" onSubmit={handleSubmit}>
          <h4 className="title">Login to system</h4>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              required
              value={email} // Set value attribute to the state variable
              onChange={(e) => setEmail(e.target.value)} // Handle input change
            ></input>
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              value={password} // Set value attribute to the state variable
              onChange={(e) => setPassword(e.target.value)} // Handle input change
            ></input>
          </div>
          <p className="error" style={{ color: "red" }}>
            {content}
          </p>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        {/* <Link to="/register" style={{ textDecoration: "none" }}>
            <p>Register</p>
          </Link> */}
      </div>
    </div>
  );
}

export default LoginPage;
