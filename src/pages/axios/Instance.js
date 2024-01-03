import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5500", // Replace with your API base URL
  withCredentials: true // Enable sending cookies with requests
});

export default axiosInstance;
