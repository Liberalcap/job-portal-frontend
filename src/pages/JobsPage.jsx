import { useState, useEffect, useMemo } from 'react';
import jobService from '../services/jobService';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoading } from '../context/LoadingContext';
import { JobsListSkeleton } from '../components/Skeleton';
import './JobsPage.css';

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const { isLoading: isNavigating } = useLoading();

  const navigate = useNavigate();

  // Filter jobs based on search query
  const filteredJobs = useMemo(() => {
    if (!searchQuery) return jobs;
    
    const query = searchQuery.toLowerCase();
    return jobs.filter(job => {
      const title = (job.title || '').toLowerCase();
      const company = (job.company || '').toLowerCase();
      const location = (job.location || '').toLowerCase();
      const description = (job.description || '').toLowerCase();
      
      return title.includes(query) || company.includes(query) || location.includes(query) || description.includes(query);
    });
  }, [jobs, searchQuery]);

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

  if (loading || isNavigating) {
    return (
      <div className="jobs-page-container">
        <div className="jobs-header">
          <div className="jobs-header-content">
            <h1>Available Jobs</h1>
            <p>Loading job listings...</p>
          </div>
        </div>
        <div className="jobs-content">
          <JobsListSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-page-container">
        <div className="jobs-content" style={{ paddingTop: '2rem' }}>
          <div className="error-container">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page-container">
      {/* Header Section */}
      <div className="jobs-header">
        <div className="jobs-header-content">
          <h1>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Available Jobs'}
          </h1>
          <p>
            {searchQuery 
              ? `${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} found matching your search` 
              : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} available`
            }
          </p>
        </div>
      </div>

      {/* Jobs Content */}
      <div className="jobs-content">
        {filteredJobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h2 className="empty-state-title">No Jobs Found</h2>
            <p className="empty-state-message">
              {searchQuery ? `No jobs found matching "${searchQuery}"` : 'No jobs available at the moment'}
            </p>
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <h3 className="job-card-title">{job.title}</h3>
                  <p className="job-card-company">{job.company}</p>
                </div>

                <div className="job-card-details">
                  <div className="job-detail">
                    <span className="job-detail-icon">📍</span>
                    <span className="job-detail-location">{job.location}</span>
                  </div>
                  <div className="job-detail">
                    <span className="job-detail-icon">💰</span>
                    <span className="job-detail-salary">{job.salary}</span>
                  </div>
                </div>

                <p className="job-card-description">{job.description}</p>

                <button
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="job-card-button"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;