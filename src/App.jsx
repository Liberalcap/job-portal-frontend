import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import authService from "./services/authService";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import UsersPage from "./pages/UsersPage";
import "./App.css";
import "./pages/Home.css";

function App() {
  const role = authService.getUserRole();

  return (
    <Router>
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="home-container">
                <h1 className="home-heading">Welcome to Job Nest</h1>
                <p className="home-subtitle">Find your next opportunity or hire top talent</p>
              </div>
            } 
          />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/create-job" element={<CreateJob />} />

          {/* Protected Routes */}
          <Route
            path="/recruiter"
            element={
              role === "ADMIN" ? (
                <RecruiterDashboard />
              ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
                </div>
              )
            }
          />

          <Route
            path="/users"
            element={
              role === "ADMIN" ? (
                <UsersPage />
              ) : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
                </div>
              )
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;