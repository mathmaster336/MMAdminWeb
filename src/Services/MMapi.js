// src/utils/axiosInstance.js
import axios from "axios";
import { getLocalStorage } from "../Utils/HelperMethods/Localstorage";

// ✅ Axios for addmessage (auth, courses)
export const MMapi = axios.create({
  baseURL: "https://authapi-t6kumycyca-em.a.run.app", 
  // baseURL: "http://127.0.0.1:5001/mathmaster-cbffc/asia-south2/authApi"
  // or Firebase URL: "https://asia-south2-<project-id>.cloudfunctions.net/addmessage"
});

// ✅ Axios for contentapi (content-related data)
export const ContentApi = axios.create({
  baseURL: "https://contentapi-t6kumycyca-em.a.run.app",
  // baseURL:"http://127.0.0.1:5001/mathmaster-cbffc/asia-south2/contentApi"
  // or Firebase URL: "https://asia-south2-<project-id>.cloudfunctions.net/contentapi"
});

// Common request interceptor for both
const attachToken = (config) => {
  const token = getLocalStorage("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.userType = "admin";
  return config;
};

// Attach interceptors
[MMapi, ContentApi].forEach((instance) => {
  instance.interceptors.request.use(attachToken, (error) => Promise.reject(error));

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized - redirect or logout user");
      }
      return Promise.reject(error);
    }
  );
});




// // src/utils/axiosInstance.js
// import axios from "axios";
// import { getLocalStorage } from "../Utils/HelperMethods/Localstorage";

// // Create an Axios instance
// const MMapi = axios.create({
//   baseURL: "https://addmessage-t6kumycyca-em.a.run.app",
//   // baseURL: "http://127.0.0.1:5001/mathmaster-cbffc/asia-south2/addmessage", // Change to your API base URL
//   // Change to your API base URL
//   //   timeout: 10000,
// });

// // Add a request interceptor to attach token
// MMapi.interceptors.request.use(
//   (config) => {
//     const token = getLocalStorage("token");
//     if (token) {
//       config.headers.authorization = `Bearer ${token}`; // ✅ add Bearer prefix
//     }
//     config.headers.userType = "admin";
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Optional: Add a response interceptor (e.g., for global error handling)
// MMapi.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Auto logout or redirect if needed
//       console.warn("Unauthorized - maybe redirect to login");
//     }
//     return Promise.reject(error);
//   }
// );

// export default MMapi;
