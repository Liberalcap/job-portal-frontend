import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import jobService from "../services/jobService";
import authService from "../services/authService";
import { useLoading } from "../context/LoadingContext";
import { JobDetailsSkeleton } from "../components/Skeleton";
import './JobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading: isNavigating } = useLoading();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");

  // 🔥 Fetch job details
  useEffect(() => {
    api.get(`/api/jobs/${id}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load job");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // 🔥 Check if already applied
  useEffect(() => {
    if (authService.isAuthenticated()) {
      jobService.hasApplied(id)
        .then((res) => {
          if (res === true) {
            setApplied(true);
          }
        })
        .catch((err) => {
          console.error("Check applied error:", err);
        });
    }
  }, [id]);

  const handleApply = async () => {
    // 🔒 Check login BEFORE API call
    if (!authService.isAuthenticated()) {
      setMessage("⚠️ Please login to apply for this job");
      navigate("/login");
      return;
    }

    try {
      const res = await jobService.applyToJob(id);
      setApplied(true);
      setMessage("✅ Applied successfully!");
      console.log("Response:", res);
    } catch (err) {
      console.error("Apply error:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        setMessage("⚠️ Session expired. Please login again.");
        navigate("/login");
      } else if (err.response?.status === 400) {
        setApplied(true);
        setMessage("⚠️ You already applied for this job");
      } else {
        setMessage("❌ Something went wrong. Try again.");
      }
    }
  };

  if (loading || isNavigating) {
    return (
      <div className="job-details-page-container">
        <div className="job-details-header">
          <div className="job-details-header-content">
            <h1>Loading Job Details</h1>
            <p>Please wait while we fetch the information...</p>
          </div>
        </div>
        <div className="job-details-content">
          <JobDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-details-page-container">
        <div className="job-details-header">
          <div className="job-details-header-content">
            <h1>Job Details</h1>
            <p>View complete job information</p>
          </div>
        </div>
        <div className="job-details-content">
          <div className="error-container">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page-container">
      {/* Header Section */}
      <div className="job-details-header">
        <div className="job-details-header-content">
          <h1>{job.title}</h1>
          <p>{job.company} • {job.location}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="job-details-content">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="job-details-card">
          {/* Message Alert */}
          {message && (
            <div className={`job-message ${
              message.includes("✅") ? "message-success" :
              message.includes("⚠️") ? "message-warning" :
              "message-error"
            }`}>
              {message}
            </div>
          )}

          {/* Details Grid */}
          <div className="job-details-grid">
            <div className="detail-item">
              <span className="detail-label">Company</span>
              <span className="detail-value detail-company">{job.company}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location</span>
              <span className="detail-value">{job.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Salary</span>
              <span className="detail-value detail-salary">{job.salary}</span>
            </div>
          </div>

          {/* Description Section */}
          <div className="description-section">
            <label className="description-label">Job Description</label>
            <p className="description-text">{job.description}</p>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            disabled={applied}
            className={`apply-button ${
              applied
                ? "apply-button-disabled"
                : "apply-button-active"
            }`}
          >
            {applied
              ? "✓ Already Applied"
              : authService.isAuthenticated()
                ? "Apply Now"
                : "Login to Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;