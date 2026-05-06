import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import './ForgotPassword.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.forgotPassword(email);

      setSuccess(
        'Password reset link generated successfully. Check backend console for reset link.'
      );

    } catch (err) {
      console.error('Forgot password error:', err);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to send reset link. Please try again.';

      setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-container">

        <div className="forgot-password-header">
          <h2>Forgot Password</h2>

          <p>
            Enter your email address and we'll generate a password reset link.
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleRequestReset}>

          <div className="form-group">
            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="reset-button"
          >
            {loading ? 'Generating Link...' : 'Send Reset Link'}
          </button>

        </form>

        <div className="back-to-login">
          <Link to="/login">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPasswordPage;