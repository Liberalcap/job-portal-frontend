import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import Navbar from "./components/Navbar";
import LoadingBar from "./components/LoadingBar";
import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import UsersPage from "./pages/UsersPage";
import HomePage from "./pages/HomePage"; // ✅ ADD THIS
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import authService from "./services/authService";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import "./App.css";

function App() {
  const role = localStorage.getItem("userRole")?.replace("ROLE_", "");

  return (
    <Router>
      <LoadingProvider>
        <LoadingBar />
        <Navbar />

      <main className="bg-gray-50 min-h-screen w-full">
        <Routes>
          {/* ✅ CLEAN HOME ROUTE */}
          <Route path="/" element={<HomePage />} />
          
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/recruiter"
            element={
              role === "RECRUITER" ? (
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
              role === "RECRUITER" ? (
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

          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
        </Routes>
      </main>
      </LoadingProvider>
    </Router>
  );
}

export default App;