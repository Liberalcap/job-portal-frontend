import { useEffect, useState } from "react";
import applicationService from "../services/applicationService";
import api from "../services/api";

function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Fetch recruiter jobs (FIXED PROPERLY)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/my"); // ✅ USE API INSTANCE
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

  // ✅ Fetch applications when job is selected
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

  // ✅ Update status
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
    <div style={{ padding: "20px" }}>
      <h2>Recruiter Dashboard</h2>

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Job Selection */}
      <h3>Select Job</h3>
      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map((job) => (
          <button
            key={job.id}
            onClick={() => setSelectedJob(job)}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          >
            {job.title}
          </button>
        ))
      )}

      {/* ✅ No job selected */}
      {!selectedJob && <p>Please select a job</p>}

      {/* ✅ Loading */}
      {loading && <p>Loading applications...</p>}

      {/* ✅ Applications */}
      {selectedJob && !loading && (
        <>
          {applications.length === 0 ? (
            <p>No applications found</p>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <p><b>Candidate:</b> {app.userEmail}</p>
                <p><b>Job:</b> {app.jobTitle}</p>
                <p><b>Status:</b> {app.status}</p>

                <button
                  disabled={app.status === "ACCEPTED"}
                  onClick={() => updateStatus(app.id, "ACCEPTED")}
                >
                  Accept
                </button>

                <button
                  disabled={app.status === "REJECTED"}
                  onClick={() => updateStatus(app.id, "REJECTED")}
                  style={{ marginLeft: "10px" }}
                >
                  Reject
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default RecruiterDashboard;