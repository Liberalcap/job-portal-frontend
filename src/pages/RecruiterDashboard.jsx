import { useEffect, useState } from "react";
import applicationService from "../services/applicationService";

function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const jobId = 1; // 🔥 TEMP (we improve later)

  useEffect(() => {
    applicationService.getJobApplications(jobId)
      .then((data) => {
        setApplications(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await applicationService.updateApplicationStatus(id, status);

      // update UI instantly
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Recruiter Dashboard</h2>

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

            <button onClick={() => updateStatus(app.id, "ACCEPTED")}>
              Accept
            </button>

            <button
              onClick={() => updateStatus(app.id, "REJECTED")}
              style={{ marginLeft: "10px" }}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default RecruiterDashboard;