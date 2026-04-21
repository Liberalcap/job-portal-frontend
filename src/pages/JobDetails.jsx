import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api"; // ✅ using your API service

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      {/* 👇 next feature */}
      <button style={{ marginTop: "15px", padding: "10px 20px" }}>
        Apply Now
      </button>
    </div>
  );
}

export default JobDetails;