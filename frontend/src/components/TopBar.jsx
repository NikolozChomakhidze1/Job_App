import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function TopBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/");
  }

  return (
    <div className="topbar">
      <div className="topbarInner">
        <Link to="/" className="brand">
          JobApp
        </Link>
        

        <div className="topbarRight">
          {!user ? (
            <>
              <Link className="linkBtn" to="/login">
                Login
              </Link>
              <Link className="btn btnPrimary" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="badge">
                {user.name} • <span className="rolePill">{user.role}</span>
              </span>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
