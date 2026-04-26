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

  const handleApply = async () => {
    try {
      const res = await jobService.applyToJob(id);

      setApplied(true);
      setMessage("✅ Applied successfully!");
      console.log("Response:", res);

    } catch (err) {
      console.error("Apply error:", err);

      if (err.response?.status === 400) {
        setApplied(true);
        setMessage("⚠️ You already applied for this job");
      } else {
        setMessage("❌ Something went wrong. Try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{job.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
            <p className="text-xl text-blue-600 font-semibold">{job.company}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
            <p className="text-xl text-gray-900 font-semibold">{job.location}</p>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">Salary</label>
          <p className="text-2xl font-bold text-green-600">{job.salary}</p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes("✅") ? "bg-green-100 border border-green-400 text-green-700" :
            message.includes("⚠️") ? "bg-yellow-100 border border-yellow-400 text-yellow-700" :
            "bg-red-100 border border-red-400 text-red-700"
          }`}>
            {message}
          </div>
        )}

        <button
          onClick={handleApply}
          disabled={applied}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            applied
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {applied ? "Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}

export default JobDetails;