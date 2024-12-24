import axios from "axios";

const baseURL = "https://your-backend-url.com"; // Replace with your actual backend URL

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (e.g., attach accessToken)
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (e.g., handle token refresh)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if it's an auth error and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available.");
        }

        // Request new access token
        const response = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken,
        });

        // Store new access token
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        // Retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        console.error("Token refresh failed:", refreshError);
        localStorage.clear(); // Clear tokens from localStorage
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
