import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobsPage from './pages/JobsPage';
import authService from './services/authService';
import './App.css';

function App() {
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '20px' }}>
          Home
        </Link>
        <Link to="/jobs" style={{ marginRight: '20px' }}>
          Jobs
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ marginLeft: 'auto' }}>
            Login
          </Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h1 style={{ padding: '20px' }}>Welcome to Job Portal</h1>} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;