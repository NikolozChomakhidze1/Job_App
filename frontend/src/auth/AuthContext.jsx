import { createContext, useContext, useEffect, useState } from "react";
import { getMe, loginUser, registerUser } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  async function bootstrap() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getMe();
      setUser(data.user);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setBooting(false);
    }
  }

  useEffect(() => {
    bootstrap();
  }, []);

  async function login(email, password) {
    const data = await loginUser({ email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  }

  async function register(payload) {
    const data = await registerUser(payload);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, booting, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
