import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobsPage from './pages/JobsPage';
import authService from './services/authService';
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications"; // ✅ fixed
import './App.css';
import RecruiterDashboard from "./pages/RecruiterDashboard";

function App() {
  const isAuthenticated = authService.isAuthenticated();
  const role = authService.getUserRole();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '20px' }}>
          Home
        </Link>

        {/* ✅ fixed route */}
        <Link to="/my-applications" style={{ marginRight: '20px' }}>
          My Applications
        </Link>

        <Link to="/jobs" style={{ marginRight: '20px' }}>
          Jobs
        </Link>

        {role === "ADMIN" && (
        <Link to="/recruiter" style={{ marginRight: "20px" }}>
          Recruiter
        </Link>
        )}

        {isAuthenticated ? (
          <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ marginLeft: 'auto' }}>
            Login
          </Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h1 style={{ padding: '20px' }}>Welcome to Job Portal</h1>} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/my-applications" element={<MyApplications />} />

        <Route
          path="/recruiter"
          element={
            authService.getUserRole() === "ADMIN"
              ? <RecruiterDashboard />
              : <h2 style={{ padding: "20px" }}>Access Denied</h2>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;