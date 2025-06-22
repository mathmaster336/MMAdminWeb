// src/utils/axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const MMapi = axios.create({
  // baseURL: 'https://api-t6kumycyca-uc.a.run.app', 
  baseURL: 'http://127.0.0.1:5001/mathmaster-cbffc/us-central1/api/', // Change to your API base URL
  // Change to your API base URL
//   timeout: 10000,
});

// Add a request interceptor to attach token
MMapi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage / cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor (e.g., for global error handling)
MMapi.interceptors.response.use(
  (response) => {return response.data},
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout or redirect if needed
      console.warn('Unauthorized - maybe redirect to login');
    }
    return Promise.reject(error);
  }
);

export default MMapi;
