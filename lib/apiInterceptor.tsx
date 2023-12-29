// axiosReqInstance.js

import axios from "axios";

const accessToken = "xox";
const baseURL = "http://125.99.33.31:8081/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWZlNWEyOGMtMjg5NS00MGI5LThmZWEtY2U2N2Y3NjU0NTg4IiwiZXhwIjoxNzAzNTg2ODczfQ.VPmgQINKWYVQgFqaIHzyn029p7ztsQGtmsABRvsiqPM";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const axiosReqInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic c2FsdF90ZWNoX2RldnM6c2FsdF90ZWNoX2RldnM=",
    "x-token": token,
  },
  // other configuration options
});

// Add interceptors
axiosReqInstance.interceptors.request.use(
  (config) => {
    // Modify the request config

    // Initialize headers as an empty object if it is undefined
    const newConfig = { ...config };
    newConfig.headers = newConfig.headers || {};

    // If an access token exists, add it to the Authorization header
    // if (accessToken) {
    //   newConfig.headers["x-token"] = `${accessToken}`;
    // }

    return newConfig;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosReqInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosReqInstance;
