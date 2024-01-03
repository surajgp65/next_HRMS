// axiosInstance.js

import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";

const baseURL = "http://192.168.0.37:8001/";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic c2FsdF90ZWNoX2RldnM6c2FsdF90ZWNoX2RldnM=",
  },
  // other configuration options
});

// Add interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config

    let loaderId = document.getElementById("showLoader");
    if (loaderId) {
      if (loaderId.classList.contains("d-none")) {
        loaderId.classList.remove("d-none");
      }
    }

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
    console.log("errrorrrrr-->", error);
    let loaderId = document.getElementById("showLoader");
    if (loaderId) {
      loaderId.classList.add("d-none");
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    let loaderId = document.getElementById("showLoader");
    if (loaderId) loaderId.classList.add("d-none");
    return response;
  },
  (error: any) => {
    // Handle response errors
    toast.error(`${error.response.data.message} !!!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
    let loaderId = document.getElementById("showLoader");
    if (loaderId) loaderId.classList.add("d-none");
    return Promise.reject(error);
  }
);

export default axiosInstance;
