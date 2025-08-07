import axios from "axios";

// const apiUrl = "http://localhost:5000";

const apiUrl = "https://task-back-sable.vercel.app"

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response Error:", error);

    if (error.response && error.response.status === 401) {
      console.log("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
