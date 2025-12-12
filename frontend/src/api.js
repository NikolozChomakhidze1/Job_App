const API_URL = "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export const registerUser = (payload) =>
  apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(payload) });

export const loginUser = (payload) =>
  apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(payload) });

export const getMe = () => apiFetch("/api/auth/me");

export const fetchJobs = () => apiFetch("/api/jobs");

export const fetchApplications = (jobId) => apiFetch(`/api/jobs/${jobId}/applications`);

export const createApplication = (jobId, payload) =>
  apiFetch(`/api/jobs/${jobId}/applications`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateApplicationStatus = (appId, status) =>
  apiFetch(`/api/applications/${appId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
