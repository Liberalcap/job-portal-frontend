import { useState } from 'react';
import authService from '../services/authService';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      <div className="login-wrapper">
        {/* Hero Section */}
        <div className="login-hero">
          <h1>Welcome to Job Nest</h1>
          <p>Your gateway to finding the perfect job or the perfect candidate. Start your journey today.</p>
          
          <div className="login-features">
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <div className="feature-content">
                <h3>Quick & Easy</h3>
                <p>Sign in seconds and start exploring opportunities</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <div className="feature-content">
                <h3>Secure</h3>
                <p>Your data is protected with enterprise-grade security</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">⭐</div>
              <div className="feature-content">
                <h3>Trusted</h3>
                <p>Join thousands of professionals on Job Nest</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="login-form-container">
          <div className="login-form-header">
            <h2>Sign In</h2>
            <p>Access your Job Nest account</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">🔐</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="signup-link">
            Don't have an account? <a href="#signup">Create one now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
