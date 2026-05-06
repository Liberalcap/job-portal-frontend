import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import authService from '../services/authService';
import './ForgotPassword.css';

function ResetPasswordPage() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResetPassword = async (e) => {

    e.preventDefault();

    setError('');
    setSuccess('');

    // Password match validation
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Minimum password validation
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {

      await authService.resetPassword(token, newPassword);

      setSuccess('Password reset successful! Redirecting to login...');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {

      console.error('Reset password error:', err);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to reset password.';

      setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">

      <div className="forgot-password-form-container">

        <div className="forgot-password-header">

          <h2>Reset Password</h2>

          <p>
            Create a new password for your account.
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

        <form onSubmit={handleResetPassword}>

          {/* New Password */}
          <div className="form-group">

            <label className="form-label">
              New Password
            </label>

            <div className="password-input-wrapper">

              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter new password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>

            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">

            <label className="form-label">
              Confirm Password
            </label>

            <div className="password-input-wrapper">

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Confirm new password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="reset-button"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPasswordPage;