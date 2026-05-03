import { useEffect, useState } from "react";
import applicationService from "../services/applicationService";
import "./MyApplications.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getMyApplications()
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

  const getStatusClass = (status) => {
    switch(status) {
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
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: '2-digit', month: 'short' });
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
          <h1>Opportunities</h1>
        </div>

        {applications.length === 0 ? (
          <div className="applications-empty">
            <p>No applications yet. Start applying to opportunities now!</p>
          </div>
        ) : (
          <div className="applications-grid">
            <div className="table-header">
              <div>Opportunities</div>
              <div>Applicants</div>
              <div>Application Status</div>
              <div></div>
              <div>View Application</div>
            </div>

            {applications.map((app) => (
              <div key={app.id} className="application-card">
                <div className="card-header">
                  <div className="card-title">
                    <a href="#" className="card-title-link">
                      {app.jobTitle}
                      <span className="external-icon">↗</span>
                    </a>
                  </div>
                  <div className="card-company">{app.companyName}</div>
                  <div className="card-date">Applied on {formatDate(app.appliedDate)}</div>
                </div>

                <div className="card-info-group">
                  <div className="card-info-label">Applicants</div>
                  <div className="card-info-value">{app.applicantCount || 0}</div>
                </div>

                <div className="card-info-group">
                  <div className="card-info-label">Status</div>
                  <span className={`status-badge ${getStatusClass(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                <div className="card-info-group"></div>

                <div className="application-action">
                  <button className="action-icon" title="View details">
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