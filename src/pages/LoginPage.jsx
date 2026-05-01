import { useState } from 'react';
import authService from '../services/authService';
import { Link } from "react-router-dom";
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email });
      const response = await authService.login({ email, password });
      console.log('Login successful:', response);
      window.location.href = '/';
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = 
        err.response?.data?.message || 
        err.response?.data?.error ||
        err.message ||
        'Login failed. Please check your credentials.';
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
              <path d="M17.05 13.5c-.91 0-1.64.58-2.05 1.34.64.65 1.04 1.54 1.04 2.55 0 2.08-1.71 3.75-3.8 3.75-1.04 0-1.95-.41-2.59-1.05-.5.74-1.3 1.23-2.19 1.23-2.08 0-3.75-1.71-3.75-3.8 0-2.08 1.67-3.75 3.75-3.75.9 0 1.7.5 2.19 1.23.64-.65 1.55-1.05 2.59-1.05 1.01 0 1.91.37 2.59 1.01.4-.76 1.13-1.36 2.05-1.36 2.08 0 3.75 1.67 3.75 3.75 0 2.08-1.67 3.75-3.75 3.75z"/>
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your password"
              />
              <button type="button" className="password-toggle">👁️</button>
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
