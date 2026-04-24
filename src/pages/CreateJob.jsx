import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // ✅ ADD THIS DELAY
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    await api.post("/jobs", job);

    setSuccess("Job created successfully!");

    setTimeout(() => {
      navigate("/recruiter");
    }, 1000);

    } catch (err) {
        console.error(err);
        setSuccess("");
        alert("Error creating job");
    } finally {
        setLoading(false);
    }
    };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Job</h2>

      {/* ✅ SUCCESS MESSAGE */}
      {success && (
        <p style={{ color: "green", marginBottom: "10px" }}>
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
        /><br /><br />

        <input
          name="company"
          placeholder="Company"
          onChange={handleChange}
        /><br /><br />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
        /><br /><br />

        <input
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
        /><br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        ></textarea><br /><br />

        {/* ✅ BUTTON FIX */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
}

export default CreateJob;