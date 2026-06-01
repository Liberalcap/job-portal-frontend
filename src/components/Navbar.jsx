import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authService";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // ✅ Close menu when link is clicked
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">

          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/">Job Nest</Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Combined Mobile Menu */}
          <div className={`mobile-menu-container ${mobileMenuOpen ? "open" : ""}`}>
            {/* Navigation Links */}
            <div className="navbar-links-mobile">
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                Home
              </Link>

              <Link to="/jobs" className="nav-link" onClick={closeMobileMenu}>
                Jobs
              </Link>

              {/* Logged-in User Links */}
              {isAuthenticated && role !== "RECRUITER" && (
                <Link to="/my-applications" className="nav-link" onClick={closeMobileMenu}>
                  Applications
                </Link>
              )}

              {/* Recruiter Links */}
              {role === "RECRUITER" && (
                <>
                  <Link to="/recruiter" className="nav-link" onClick={closeMobileMenu}>
                    Dashboard
                  </Link>
                  <Link to="/create-job" className="nav-link" onClick={closeMobileMenu}>
                    Post Job
                  </Link>
                  <Link to="/users" className="nav-link" onClick={closeMobileMenu}>
                    Users
                  </Link>
                </>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="navbar-auth-mobile">
              {isAuthenticated ? (
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="btn-logout">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn-login" onClick={closeMobileMenu}>
                    Login
                  </Link>
                  <Link to="/register" className="btn-register" onClick={closeMobileMenu}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="navbar-links-desktop">
            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>

            {/* Logged-in User Links */}
            {isAuthenticated && role !== "RECRUITER" && (
              <Link to="/my-applications" className="nav-link">
                Applications
              </Link>
            )}

            {/* Recruiter Links */}
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

          {/* Desktop Auth Buttons */}
          <div className="navbar-auth-desktop">
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