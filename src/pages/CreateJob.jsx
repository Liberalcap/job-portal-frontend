import { useState } from "react";
import api from "../services/api";

function CreateJob() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", job);
      alert("Job created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating job");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Job</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} /><br /><br />
        <input name="company" placeholder="Company" onChange={handleChange} /><br /><br />
        <input name="location" placeholder="Location" onChange={handleChange} /><br /><br />
        <input name="salary" placeholder="Salary" onChange={handleChange} /><br /><br />

        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea><br /><br />

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
}

export default CreateJob;