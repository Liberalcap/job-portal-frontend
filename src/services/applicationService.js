import api from "./api";

const applicationService = {

  // 🔥 Apply to a job
  applyForJob: async (jobId) => {
    const response = await api.post(`/applications/${jobId}`);
    return response.data;
  },

  // 🔥 Get logged-in user's applications
  getMyApplications: async () => {
    const response = await api.get("/applications/my");
    return response.data;
  },

  // 🔥 Get applications for a specific job (HR/Admin)
  getJobApplications: async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },

  // 🔥 Update application status
  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(
      `/applications/${applicationId}/status`,
      null,
      {
        params: { status }
      }
    );
    return response.data;
  },

  updateStatus: async (id, status) => {
  const response = await api.put(`/applications/${id}/status`, null, {
    params: { status },
  });
  return response.data;
  },
};

export default applicationService;