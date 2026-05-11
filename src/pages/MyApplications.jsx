import { useEffect, useState } from "react";
import applicationService from "../services/applicationService";
import "./MyApplications.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationService.getMyApplications();

        console.log("Applications Response:", data);

        // Handle different response structures
        if (Array.isArray(data)) {
          setApplications(data);
        } else if (Array.isArray(data.data)) {
          setApplications(data.data);
        } else {
          setApplications([]);
        }

      } catch (err) {
        console.error("Applications Error:", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "status-accepted";
      case "REJECTED":
        return "status-rejected";
      case "PENDING":
        return "status-pending";
      default:
        return "status-other";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="applications-container">
        <div className="applications-wrapper">
          <div className="applications-loading">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <div className="applications-wrapper">

        <div className="applications-header">
          <h1>My Applications</h1>
        </div>

        {applications.length === 0 ? (
          <div className="applications-empty">
            <p>No applications found.</p>
          </div>
        ) : (
          <div className="applications-grid">

            <div className="table-header">
              <div>Job</div>
              <div>Company</div>
              <div>Status</div>
              <div>Applied Date</div>
              <div>Action</div>
            </div>

            {applications.map((app) => (
              <div key={app.id} className="application-card">

                <div className="card-header">
                  <div className="card-title">
                    {app.jobTitle || "Untitled Job"}
                  </div>

                  <div className="card-company">
                    {app.companyName || "Unknown Company"}
                  </div>
                </div>

                <div className="card-info-group">
                  <span
                    className={`status-badge ${getStatusClass(app.status)}`}
                  >
                    {app.status || "PENDING"}
                  </span>
                </div>

                <div className="card-date">
                  {formatDate(app.appliedDate)}
                </div>

                <div className="application-action">
                  <button
                    className="action-icon"
                    title="View Application"
                  >
                    📋
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;