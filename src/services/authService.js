import api from "./api";

const notifyAuthChange = () => window.dispatchEvent(new Event("authchange"));

const authService = {
  // Register
  register: async (userData) => {
  try {
    const response = await api.post("/api/auth/register", userData);

    const { token, role } = response.data;

    // 🔥 store token immediately
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);
    notifyAuthChange();

    return response.data;

  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
},

  // Login
  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("userRole", response.data.role);
    notifyAuthChange();

    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    notifyAuthChange();
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

  // Forgot Password - Request reset link
  forgotPassword: async (email) => {
    const response = await api.post("/api/auth/forgot-password", { email });
    return response.data;
  },

  // Reset Password - Reset with email
  resetPassword: async (token, newPassword) => {
  const response = await api.post("/api/auth/reset-password", {
    token,
    newPassword,
  });

  return response.data;
},
};

export default authService;
