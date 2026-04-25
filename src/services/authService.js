import api from "./api";

const authService = {
  // Register
  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);
    }

    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("userRole", response.data.role);

    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },

  // Get role
  getUserRole: () => {
    const role = localStorage.getItem("userRole");

    // normalize ROLE_ADMIN → ADMIN
    if (role?.startsWith("ROLE_")) {
      return role.replace("ROLE_", "");
    }

    return role;
  },

  // Get email from JWT
  getUserEmail: () => {
    const token = localStorage.getItem("authToken"); // ✅ FIXED

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub; // or payload.email depending on backend
    } catch (e) {
      return null;
    }
  },

  // Auth check
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};

export default authService;