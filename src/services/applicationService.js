import api from './api';

const applicationService = {
  // Apply for a job
  applyForJob: async (jobId, applicationData) => {
    const response = await api.post(`/applications`, {
      jobId,
      ...applicationData,
    });
    return response.data;
  },

  // Get all applications for a user
  getUserApplications: async (userId, page = 0, size = 10) => {
    const response = await api.get(`/applications/user/${userId}`, {
      params: { page, size },
    });
    return response.data;
  },

  // Get all applications for a job (HR/Admin)
  getJobApplications: async (jobId, page = 0, size = 10) => {
    const response = await api.get(`/applications/job/${jobId}`, {
      params: { page, size },
    });
    return response.data;
  },

  // Get application by ID
  getApplicationById: async (applicationId) => {
    const response = await api.get(`/applications/${applicationId}`);
    return response.data;
  },

  // Update application status (HR/Admin)
  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(`/applications/${applicationId}`, { status });
    return response.data;
  },

  // Get application count for a job
  getApplicationCount: async (jobId) => {
    const response = await api.get(`/applications/count/${jobId}`);
    return response.data;
  },
};

export default applicationService;
