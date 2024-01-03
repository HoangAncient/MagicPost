import axiosInstance from '../axios/Instance';
import { useState, useEffect } from 'react';

const useAuth = (token) => {
  const [role, setRole] = useState(null);

  const getRole = async (jwtToken) => {
    try {
      const response = await axiosInstance.post('api/auth/role', {
        jwt: jwtToken,
      });
      setRole(response.data.role);
      console.log(role);
    } catch (error) {
      console.log(error.response.status);
    }
  };

  useEffect(() => {
    if (token) {
      getRole(token);
    }
  }, []);

  return { role };
};

export default useAuth;
