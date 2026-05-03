import { useState, useEffect, useMemo } from 'react';
import jobService from '../services/jobService';
import { useNavigate, useSearchParams } from "react-router-dom";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading jobs...</p>
          </div>
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
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Available Jobs'}
        </h2>
        <p className="text-gray-600">
          {searchQuery 
            ? `${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} found matching your search` 
            : `${jobs.length} job${jobs.length !== 1 ? 's' : ''} available`
          }
        </p>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {searchQuery ? `No jobs found matching "${searchQuery}"` : 'No jobs available at the moment'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-blue-600 font-semibold">{job.company}</p>
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📍</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">💰</span>
                  <span className="font-semibold text-gray-900">{job.salary}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 line-clamp-3">{job.description}</p>

              <button
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
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