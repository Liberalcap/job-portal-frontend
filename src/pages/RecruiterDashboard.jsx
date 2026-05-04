import { useEffect, useState } from "react";
import applicationService from "../services/applicationService";
import api from "../services/api";
import "./RecruiterDashboard.css";

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
                    <button
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`job-button ${
                        selectedJob?.id === job.id ? "active" : "inactive"
                      }`}
                    >
                      {job.title}
                    </button>
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
                            <button
                              disabled={app.status === "ACCEPTED"}
                              onClick={() => updateStatus(app.id, "ACCEPTED")}
                              className="action-button btn-accept"
                            >
                              Accept
                            </button>

                            <button
                              disabled={app.status === "REJECTED"}
                              onClick={() => updateStatus(app.id, "REJECTED")}
                              className="action-button btn-reject"
                            >
                              Reject
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