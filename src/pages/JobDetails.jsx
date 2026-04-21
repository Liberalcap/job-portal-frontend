import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import jobService from "../services/jobService";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`)
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

  // 🔥 APPLY FUNCTION (IMPROVED)
  const handleApply = async () => {
    try {
      const res = await jobService.applyToJob(id);

      setApplied(true);
      setMessage("✅ Applied successfully!");
      console.log("Response:", res);

    } catch (err) {
      console.error("Apply error:", err);

      // 👇 handle backend response properly
      if (err.response?.status === 400) {
        setApplied(true); // already applied
        setMessage("⚠️ You already applied for this job");
      } else {
        setMessage("❌ Something went wrong. Try again.");
      }
    }
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{job.title}</h1>

      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Description:</b> {job.description}</p>
      <p><b>Salary:</b> {job.salary}</p>

      {/* 🔥 APPLY BUTTON */}
      <button
        onClick={handleApply}
        disabled={applied}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          cursor: applied ? "not-allowed" : "pointer",
          backgroundColor: applied ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px"
        }}
      >
        {applied ? "Applied" : "Apply Now"}
      </button>

      {/* 🔥 MESSAGE */}
      {message && (
        <p style={{ marginTop: "10px" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default JobDetails;