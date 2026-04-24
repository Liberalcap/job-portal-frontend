import api from './api';

const authService = {
  // User registration
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  login: async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  localStorage.setItem("authToken", response.data.token);
  localStorage.setItem("userRole", response.data.role); // ✅ ADD THIS

  return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  getUserRole: () => {
  return localStorage.getItem("userRole");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

export default authService;
