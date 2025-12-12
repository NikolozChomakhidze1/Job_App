import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function TopBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const { pathname } = useLocation();

  const role = user?.role || "guest";
  const canAddJob = role === "admin" || role === "recruiter";

  function handleLogout() {
    logout();
    // if you were on a protected-ish page, send home
    if (pathname !== "/") nav("/");
  }

  return (
    <div className="topbar">
      <div className="topbarLeft">
        <Link className="brand" to="/">JobApp</Link>
      </div>

      <div className="topbarRight">
        {user ? (
          <>
            <span className="muted" style={{ marginRight: 10 }}>
              {user.name} • <b>{user.role}</b>
            </span>

            {canAddJob && (
              <Link className="btn ghost" to="/add-job">
                Add Job
              </Link>
            )}

            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn ghost" to="/login">Login</Link>
            <Link className="btn" to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
