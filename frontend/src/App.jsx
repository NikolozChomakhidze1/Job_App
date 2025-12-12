import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./auth/AuthContext";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import MainApp from "./pages/MainApp.jsx";
import AddJob from "./pages/AddJob";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="appRoot">
      <header className="topbar">
        <div className="topbarInner">
          <Link to="/" className="brand">JobApp</Link>

          <nav className="topbarRight">
            {user ? (
              <>
                <span className="navUser">
                  {user.name} • <b>{user.role}</b>
                </span>

                <Link className="navLink" to="/jobs/add">Add Job</Link>

                <button
                  className="navButton"
                  onClick={() => {
                    logout();
                    window.location.href = "/"; // instantly refresh UI
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="navLink" to="/login">Login</Link>
                <Link className="navButton" to="/register">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/jobs/add" element={<AddJob />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
