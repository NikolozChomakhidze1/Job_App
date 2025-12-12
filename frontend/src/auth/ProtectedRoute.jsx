import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, booting } = useAuth();

  if (booting) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
