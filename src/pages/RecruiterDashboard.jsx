import { useEffect, useState } from "react";
import applicationService from "../services/applicationService";
import api from "../services/api";

function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/api/jobs/my");
        console.log("Jobs:", res.data);

        setJobs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Jobs fetch error:", err);
        setError("Failed to load jobs");
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!selectedJob) return;

    const fetchApplications = async () => {
      try {
        setLoading(true);

        const data = await applicationService.getJobApplications(selectedJob.id);
        setApplications(data);
      } catch (err) {
        console.error("Applications fetch error:", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [selectedJob]);

  const updateStatus = async (id, status) => {
    try {
      await applicationService.updateApplicationStatus(id, status);

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Recruiter Dashboard</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Jobs Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Jobs</h3>

            {jobs.length === 0 ? (
              <p className="text-gray-600">No jobs created yet</p>
            ) : (
              <div className="space-y-2">
                {jobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                      selectedJob?.id === job.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {job.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Applications */}
        <div className="lg:col-span-2">
          {!selectedJob ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg">Select a job to view applications</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Applications for {selectedJob.title}
              </h3>

              {loading && (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              )}

              {!loading && applications.length === 0 ? (
                <p className="text-gray-600 text-center py-12">No applications yet</p>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{app.userEmail}</p>
                          <p className="text-sm text-gray-600">{app.jobTitle}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === "ACCEPTED" ? "bg-green-100 text-green-800" :
                          app.status === "REJECTED" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          disabled={app.status === "ACCEPTED"}
                          onClick={() => updateStatus(app.id, "ACCEPTED")}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
                        >
                          Accept
                        </button>

                        <button
                          disabled={app.status === "REJECTED"}
                          onClick={() => updateStatus(app.id, "REJECTED")}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;