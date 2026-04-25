import api from "./api";

const applicationService = {

  // Apply to a job
  applyForJob: async (jobId) => {
    const response = await api.post(`/api/applications/${jobId}`);
    return response.data;
  },

  // Get logged-in user's applications
  getMyApplications: async () => {
    const response = await api.get("/api/applications/my");
    return response.data;
  },

  // Get applications for a specific job (Admin)
  getJobApplications: async (jobId) => {
    const response = await api.get(`/api/applications/job/${jobId}`);
    return response.data;
  },

  // Update application status
  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(
      `/api/applications/${applicationId}/status`, // ✅ FIXED
      null,
      {
        params: { status }
      }
    );
    return response.data;
  },
};

export default applicationService;