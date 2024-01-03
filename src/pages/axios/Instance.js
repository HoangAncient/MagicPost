import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://magicpostbe.onrender.com/", // Replace with your API base URL
  withCredentials: true // Enable sending cookies with requests
});

export default axiosInstance;
