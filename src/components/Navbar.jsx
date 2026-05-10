import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // ✅ Authentication check
  const isAuthenticated = authService.isAuthenticated();

  // ✅ Get role safely
  const storedRole = localStorage.getItem("userRole");
  const role = storedRole ? storedRole.replace("ROLE_", "").trim() : "";

  console.log("Navbar Role:", role);

  // ✅ Logout
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">

          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/">Job Nest</Link>
          </div>

          {/* Navigation Links */}
          <div className="navbar-links">

            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>

            {/* ✅ Logged-in User Links */}
            {isAuthenticated && (
              <Link to="/my-applications" className="nav-link">
                Applications
              </Link>
            )}

            {/* ✅ Recruiter Links */}
            {role === "RECRUITER" && (
              <>
                <Link to="/recruiter" className="nav-link">
                  Dashboard
                </Link>

                <Link to="/create-job" className="nav-link">
                  Post Job
                </Link>

                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="navbar-auth">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-login">
                  Login
                </Link>

                <Link to="/register" className="btn-register">
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;