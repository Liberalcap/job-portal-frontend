import { useState } from 'react';
import authService from '../services/authService';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const handleLogin = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    console.log("Attempting login with:", { email });

    const response = await authService.login({
      email,
      password,
    });

    console.log("Login successful:", response);

    // Store JWT token
    localStorage.setItem(
      "token",
      response.token
    );

    // Store user role properly
    localStorage.setItem(
      "userRole",
      response.user.role?.trim()
    );

    // Store full user object
    localStorage.setItem(
      "user",
      JSON.stringify(response.user)
    );

    console.log(
      "Stored Role:",
      localStorage.getItem("userRole")
    );

    // Redirect user
    navigate("/");

  } catch (err) {
    console.error("Login error:", err);

    const errorMessage =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "Login failed. Please check your credentials.";

    setError(errorMessage);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-header">
          <h2>Login</h2>
          <p>Please enter your details to login.</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="social-login">
          <button className="social-button google-button" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button className="social-button apple-button" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.3-3.14-2.53C4.25 17.12 3.5 13.63 5.02 11.25c.75-1.27 2.3-2.08 3.89-2.1 1.3-.02 2.52.73 3.38.73.86 0 2.18-.88 3.68-.74.61.02 2.37.27 3.5 2.02-.03.02-1.91 1.16-1.88 3.47.02 2.85 2.47 3.83 2.51 3.85-.13.03-.84 1.65-2.87 2.75z M12.03 7.25c-.23-1.86 1.46-3.46 3.27-3.64.15 1.95-1.82 3.53-3.27 3.64z"/>
            </svg>
            Apple
          </button>
        </div>

        <div className="divider">
          <span>Or</span>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your Email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your password"
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">Forgot Password</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        <div className="signup-link">
          Don't have an account yet? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
