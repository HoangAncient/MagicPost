import React, { useState } from "react";
import "../../../assets/css/New.min.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/AdminNav";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axiosInstance from "../../axios/Instance";
import { useNavigate } from "react-router-dom";
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
  });
  const [thiserror, setThisError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePassword = (password) => {
    const containsNumberAndCharacter =
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password);
    const isCorrectLength = password.length >= 6 && password.length <= 30;

    return containsNumberAndCharacter && isCorrectLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setThisError(
        "Password must be between 6 and 30 characters and contain at least one number and one character."
      );
      return;
    } else {
      try {
        const response = await axiosInstance.post(
          "/api/auth/register",
          formData
        );
        if (response.data.status === 200) {
          setThisError("");
          navigate("/users");
          // Handle successful registration here (e.g., redirect to a different page)
        }
      } catch (error) {
        console.error("Registration failed:", error);
        // Handle registration failure, e.g., show an error message to the user
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    {input.type === "select" ? (
                      <select
                        name={input.name}
                        value={formData[input.name]}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select {input.label}</option>
                        {input.options.map((option, index) => (
                          <option key={index} value={option.toLowerCase()}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                        name={input.name}
                        value={formData[input.name]}
                        required
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="formInput">
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
          {/* <p className="error" style={{ color: "red" }}>
            {thiserror}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default New;
