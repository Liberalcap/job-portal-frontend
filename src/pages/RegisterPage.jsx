import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";
import authService from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  setSuccessMessage("");

  // ✅ Validate first
  if (!validateForm()) {
    return;
  }

  setLoading(true);

  try {
    const { confirmPassword, ...registerData } = formData;

    await authService.register(registerData);

    // 🔥 IMPORTANT FIX: remove token so user is NOT logged in
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setSuccessMessage("Registration successful! Redirecting to login...");

    // Small delay for UX
    setTimeout(() => {
      navigate("/login");
    }, 1000);

  } catch (err) {
    setErrors(prev => ({
      ...prev,
      submit:
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again."
    }));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join our job portal and start your career journey</p>
        </div>

        {successMessage && (
          <div className="alert alert-success">
            ✓ {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="alert alert-error">
            ✗ {errors.submit}
          </div>
        )}

        <form onSubmit={handleRegister} className="register-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter a password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "input-error" : ""}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="register-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;