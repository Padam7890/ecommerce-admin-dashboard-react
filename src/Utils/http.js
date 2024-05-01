import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create an Axios instance with default configurations
const http = axios.create({
  // baseURL: "https://api-ecommerce-app-express.vercel.app/"
  baseURL: "http://127.0.0.1:3000/",
});

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to unauthorized access (status 401)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get the refresh token from local storage
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // If refresh token is not available, redirect to login
          redirectToLogin();
          return Promise.reject(error);
        }

        // Attempt to refresh the access token
        const refreshResponse = await http.patch(`/auth/refresh_token/${refreshToken}`);
        const { accessToken } = refreshResponse.data;

        // Store the new access token in local storage
        localStorage.setItem('accessToken', accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        // If refresh token is invalid or refresh fails, redirect to login
        console.error('Error refreshing token:', refreshError);
        redirectToLogin();
        return Promise.reject(error);
      }
    }

    // For other types of errors, reject the promise
    return Promise.reject(error);
  }
);

// Function to redirect to login page
const redirectToLogin = () => {
  window.location.href = '/login';
};

export default http;

