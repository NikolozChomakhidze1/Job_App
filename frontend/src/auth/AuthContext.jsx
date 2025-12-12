import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, registerUser } from "../api.js";

const AuthContext = createContext(null);

const LS_TOKEN = "jobapp_token";
const LS_USER = "jobapp_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(LS_TOKEN) || "");
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) localStorage.setItem(LS_TOKEN, token);
    else localStorage.removeItem(LS_TOKEN);
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem(LS_USER, JSON.stringify(user));
    else localStorage.removeItem(LS_USER);
  }, [user]);

  async function login(email, password) {
    const data = await loginUser({ email, password });
    setToken(data.token);
    setUser(data.user);
    return data;
  }

  async function register(name, email, password) {
    // your backend register returns user only (no token)
    // so after register we auto-login to get the token
    await registerUser({ name, email, password });
    return login(email, password);
  }

  function logout() {
    setToken("");
    setUser(null);
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_USER);
  }

  const value = useMemo(
    () => ({ user, token, isAuthed: !!token, login, register, logout }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
