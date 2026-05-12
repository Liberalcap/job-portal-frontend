import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { LoadingProvider } from "./context/LoadingContext";
import Navbar from "./components/Navbar";
import LoadingBar from "./components/LoadingBar";

import LoginPage from "./pages/LoginPage";
import JobsPage from "./pages/JobsPage";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import UsersPage from "./pages/UsersPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import "./App.css";

function App() {

  const [cleanRole, setCleanRole] = useState("");

  useEffect(() => {

    const storedRole =
      localStorage.getItem("userRole") || "";

    const formattedRole = storedRole
      .replace("ROLE_", "")
      .trim();

    setCleanRole(formattedRole);

    console.log("App Role:", formattedRole);

  }, []);

  return (
    <Router>
      <LoadingProvider>
        <LoadingBar />
        <Navbar />

        <main className="bg-gray-50 min-h-screen w-full">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

            <Route
              path="/jobs"
              element={<JobsPage />}
            />

            <Route
              path="/jobs/:id"
              element={<JobDetails />}
            />

            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/register"
              element={<RegisterPage />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            />

            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />

            {/* User Routes */}
            <Route
              path="/my-applications"
              element={
                cleanRole !== "RECRUITER" ? (
                  <MyApplications />
                ) : (
                  <div className="w-full px-6 py-12">
                    <h2 className="text-2xl font-bold text-red-600">
                      Access Denied
                    </h2>
                  </div>
                )
              }
            />

            {/* Recruiter Routes */}
            <Route
              path="/recruiter"
              element={
                cleanRole === "RECRUITER" ? (
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
              path="/create-job"
              element={
                cleanRole === "RECRUITER" ? (
                  <CreateJob />
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
              path="/edit-job/:id"
              element={
                cleanRole === "RECRUITER" ? (
                  <EditJob />
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
                cleanRole === "RECRUITER" ? (
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
      </LoadingProvider>
    </Router>
  );
}

export default App;