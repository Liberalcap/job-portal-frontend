import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./CreateJob.css";

function CreateJob() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/jobs", job);
      setSuccess("Job created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/recruiter");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Error creating job. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-container">
      <div className="create-job-wrapper">
        <div className="create-job-header">
          <h1>Post Job</h1>
          <p>Create a new job opening for your company</p>
        </div>

        <div className="create-job-content">
          <div className="create-job-card">
            {success && (
              <div className="success-message">
                <span>✅</span>
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="error-message">
                <span>❌</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="create-job-form">
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Software Developer"
                  value={job.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g., IBM"
                  value={job.company}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Mumbai, India"
                  value={job.location}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Salary</label>
                <input
                  type="text"
                  name="salary"
                  placeholder="e.g., ₹80,000 - ₹120,000"
                  value={job.salary}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                  value={job.description}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? "Posting Job..." : "Post Job"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;