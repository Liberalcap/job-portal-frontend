import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// ✅ REQUEST INTERCEPTOR (attach JWT)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR (clean + safe)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Unknown error";

    console.error("API Error:", { status, message });

    // 🔐 Handle unauthorized
    if (status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    // ⚠️ Optional: handle forbidden
    if (status === 403) {
      console.warn("Forbidden request");
    }

    // ⚠️ Optional: handle server error
    if (status === 500) {
      console.error("Server error occurred");
    }

    return Promise.reject(error);
  }
);

export default api;