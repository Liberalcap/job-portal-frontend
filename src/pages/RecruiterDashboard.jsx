import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import applicationService from "../services/applicationService";
import api from "../services/api";
import jobService from "../services/jobService";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const navigate = useNavigate();
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
      alert("Failed to update status");
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      await applicationService.deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete application");
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job? All applications for this job will also be deleted.")) {
      return;
    }

    try {
      await jobService.deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      if (selectedJob?.id === jobId) {
        setSelectedJob(null);
        setApplications([]);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete job");
    }
  };

  const editJob = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        <div className="dashboard-content">
          {error && (
            <div className="dashboard-error">
              {error}
            </div>
          )}

          <div className="dashboard-grid">
            {/* Jobs Selection Sidebar */}
            <div className="dashboard-jobs-section">
              <h3>Your Jobs</h3>

              {jobs.length === 0 ? (
                <p className="jobs-empty">No jobs created yet</p>
              ) : (
                <div className="jobs-list">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className={`job-button-wrapper ${
                        selectedJob?.id === job.id ? "active" : "inactive"
                      }`}
                    >
                      <button
                        onClick={() => setSelectedJob(job)}
                        className={`job-button`}
                      >
                        {job.title}
                      </button>
                      <div className="job-actions">
                        <button
                          onClick={() => editJob(job.id)}
                          className="job-action-btn btn-edit"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="job-action-btn btn-delete"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Applications Section */}
            <div className="dashboard-applications-section">
              <h3>Applications</h3>

              {!selectedJob ? (
                <div className="dashboard-select-job">
                  <p>Select a job to view applications</p>
                </div>
              ) : (
                <>
                  {loading && (
                    <div className="dashboard-loading">
                      <div className="spinner"></div>
                    </div>
                  )}

                  {!loading && applications.length === 0 ? (
                    <div className="dashboard-no-applications">
                      <p>No applications yet</p>
                    </div>
                  ) : (
                    <div className="applications-list">
                      {applications.map((app) => (
                        <div key={app.id} className="application-item">
                          <div className="application-header">
                            <div className="application-info">
                              <p className="application-email">{app.userEmail}</p>
                              <p className="application-job">{app.jobTitle}</p>
                            </div>
                            <span className={`status-badge status-${app.status.toLowerCase()}`}>
                              {app.status}
                            </span>
                          </div>

                          <div className="application-actions">
                            <select
                              value={app.status}
                              onChange={(e) => updateStatus(app.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="ACCEPTED">ACCEPTED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>

                            <button
                              onClick={() => deleteApplication(app.id)}
                              className="action-button btn-delete"
                              title="Delete"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;