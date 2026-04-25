import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import authService from "./services/authService";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import UsersPage from "./pages/UsersPage";
import "./App.css";

function App() {
  const isAuthenticated = authService.isAuthenticated();
  const role = authService.getUserRole();

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <Router>
      <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "20px" }}>Home</Link>
        <Link to="/jobs" style={{ marginRight: "20px" }}>Jobs</Link>
        <Link to="/my-applications" style={{ marginRight: "20px" }}>My Applications</Link>

        {/* ✅ Only ADMIN sees these */}
        {role === "ADMIN" && (
          <>
            <Link to="/recruiter" style={{ marginRight: "20px" }}>Recruiter</Link>
            <Link to="/create-job" style={{ marginRight: "20px" }}>Create Job</Link>
            <Link to="/users" style={{ marginRight: "20px" }}>Users</Link>
          </>
        )}

        {isAuthenticated ? (
          <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ marginLeft: "20px" }}>
            Login
          </Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h1 style={{ padding: "20px" }}>Welcome to Job Portal</h1>} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/create-job" element={<CreateJob />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/recruiter"
          element={
            role === "ADMIN"
              ? <RecruiterDashboard />
              : <h2 style={{ padding: "20px" }}>Access Denied</h2>
          }
        />

        <Route
          path="/users"
          element={
            role === "ADMIN"
              ? <UsersPage />
              : <h2 style={{ padding: "20px" }}>Access Denied</h2>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;