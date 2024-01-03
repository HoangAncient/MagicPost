import React, { useState } from 'react';
import axiosInstance from './axios/Instance';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    gender: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };

  const validatePassword = (password) => {
    // Password should contain at least one number and one character
    const containsNumberAndCharacter = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(
      password
    );
    // Password length between 6 and 30 characters
    const isCorrectLength = password.length >= 6 && password.length <= 30;

    return containsNumberAndCharacter && isCorrectLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
        setError(
          'Password must be between 6 and 30 characters and contain at least one number and one character.'
        );
        return;
      } else {
        try {
            const response = await axiosInstance.post('/api/auth/register', formData);
            //console.log('User registered:', response.data);
            if (response.data.status === 200) {
              setError('');
              navigate('/login');
              
            }
            // Assuming you want to do something after successful registration, e.g., redirect
            // Add your logic here, such as redirecting to a different page
      
          } catch (error) {
              if (error.response.data.status === 404){
                  setError('User already exist');
              } else if (error.response.data.status === 400) {
                  setError()
              }
              //console.error('Registration failed:', error.response.data);
              // Handle registration failure, e.g., show an error message to the user
          }
      }
    
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          required
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          placeholder="Date of Birth"
          name="dob"
          value={formData.dob}
          required
          onChange={handleChange}
        />
        <br />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <p className='error' style={{ color: 'red' }}>{error}</p>
        <button type="submit">Register</button>
      </form>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <p>Login</p>
      </Link>
    </div>
  );
};

export default Register;
