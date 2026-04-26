import { useEffect, useState } from "react";
import applicationService from "../services/applicationService";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getMyApplications()
      .then((data) => {
        setApplications(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">My Applications</h2>
        <p className="text-gray-600">{applications.length} application{applications.length !== 1 ? 's' : ''}</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 text-lg">No applications yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-600"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{app.jobTitle}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  app.status === "ACCEPTED" ? "bg-green-100 text-green-800" :
                  app.status === "REJECTED" ? "bg-red-100 text-red-800" :
                  app.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;