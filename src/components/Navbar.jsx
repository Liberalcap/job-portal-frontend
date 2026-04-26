import { Link } from "react-router-dom";
import authService from "../services/authService";
import "./Navbar.css";

function Navbar() {
  const isAuthenticated = authService.isAuthenticated();
  const role = authService.getUserRole();

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/">
              Job Nest
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="navbar-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
            <Link to="/my-applications" className="nav-link">
              Applications
            </Link>

            {/* Admin Links */}
            {role === "ADMIN" && (
              <>
                <Link to="/recruiter" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/create-job" className="nav-link">
                  Create Job
                </Link>
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </>
            )}
          </div>

          {/* Auth Button */}
          <div className="navbar-auth">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn-login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
