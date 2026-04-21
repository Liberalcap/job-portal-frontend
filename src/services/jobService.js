import api from "./api";

const jobService = {
  // Get all jobs
  getAllJobs: async (page = 0, size = 10, filters = {}) => {
    const params = { page, size, ...filters };
    const response = await api.get("/jobs", { params });
    return response.data;
  },

  // Get job by ID
  getJobById: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  },

  // Create new job
  createJob: async (jobData) => {
    const response = await api.post("/jobs", jobData);
    return response.data;
  },

  // Update job
  updateJob: async (jobId, jobData) => {
    const response = await api.put(`/jobs/${jobId}`, jobData);
    return response.data;
  },

  // Delete job
  deleteJob: async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
  },

  // Search jobs
  searchJobs: async (searchTerm) => {
    const response = await api.get("/jobs", {
      params: { search: searchTerm },
    });
    return response.data;
  },

  // ✅ APPLY TO JOB (correct)
  applyToJob: async (jobId) => {
    const response = await api.post(`/applications/${jobId}`);
    return response.data;
  },
};

export default jobService;