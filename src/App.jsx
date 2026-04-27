import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import UsersPage from "./pages/UsersPage";
import HomePage from "./pages/HomePage"; // ✅ ADD THIS
import authService from "./services/authService";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";

function App() {
  const role = authService.getUserRole();

  return (
    <Router>
      <Navbar />

      <main className="bg-gray-50 min-h-screen w-full">
        <Routes>
          {/* ✅ CLEAN HOME ROUTE */}
          <Route path="/" element={<HomePage />} />
          
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/recruiter"
            element={
              role === "ADMIN" ? (
                <RecruiterDashboard />
              ) : (
                <div className="w-full px-6 py-12">
                  <h2 className="text-2xl font-bold text-red-600">
                    Access Denied
                  </h2>
                </div>
              )
            }
          />

          <Route
            path="/users"
            element={
              role === "ADMIN" ? (
                <UsersPage />
              ) : (
                <div className="w-full px-6 py-12">
                  <h2 className="text-2xl font-bold text-red-600">
                    Access Denied
                  </h2>
                </div>
              )
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;