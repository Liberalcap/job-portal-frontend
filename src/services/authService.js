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

  login: async (email, password) => {
  const response = await api.post('/auth/login', { email, password });

  // 🔥 STORE TOKEN HERE
  localStorage.setItem("authToken", response.data.token);

  return response.data;
},

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

export default authService;
