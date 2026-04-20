import { useState, useEffect } from 'react';
import jobService from '../services/jobService';

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getAllJobs();
        setJobs(data.content || data);
      } catch (err) {
        setError('Failed to fetch jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading jobs...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <div>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '15px',
                borderRadius: '5px',
              }}
            >
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p>{job.description}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobsPage;
