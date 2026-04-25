import api from './api';

const userService = {
  // Get user profile
  getUserProfile: async (userId) => {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  },

  // Update user profile
  updateUserProfile: async (userId, userData) => {
    const response = await api.put(`/api/users/${userId}`, userData);
    return response.data;
  },

  // Get all users (Admin only)
  getAllUsers: async (page = 0, size = 10) => {
    const response = await api.get('/api/users', { params: { page, size } });
    return response.data;
  },

  // Delete user (Admin only)
  deleteUser: async (userId) => {
    const response = await api.delete(`/api/users/${userId}`);
    return response.data;
  },
};

export default userService;
