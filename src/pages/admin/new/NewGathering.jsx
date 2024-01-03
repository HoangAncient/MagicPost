import React, { useState } from 'react';
import "../../../assets/css/New.min.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/AdminNav";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axiosInstance from '../../axios/Instance';
import { useNavigate } from 'react-router-dom';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    district: '',
    street: '',
    manager: '',
    zipcode: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await axiosInstance.post('/api/auth/add_gathering', formData);
        if (response.data.status === 200) {
          setError('');
          navigate('/admin/gather');
          // Handle successful registration here (e.g., redirect to a different page)
        }
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle registration failure, e.g., show an error message to the user
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
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={formData[input.name]}
                    required
                    onChange={handleChange}
                  />
                </div>
              ))}
              <p className='error' style={{ color: 'red' }}>{error}</p>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;