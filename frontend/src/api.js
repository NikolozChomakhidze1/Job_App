// frontend/src/api.js

// Base URL for the backend API
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";
const API = `${BASE}/api`;

// Helper to parse JSON or throw a useful error
async function jsonOrThrow(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

// Helper to inject Authorization header if we have a token
function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ===================== USERS / AUTH ===================== */

export function registerUser(payload) {
  // POST /api/users/register
  return fetch(`${API}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(jsonOrThrow);
}

export function loginUser(payload) {
  // POST /api/users/login
  return fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(jsonOrThrow);
}

/* ======================= JOBS ======================= */

export function fetchJobs() {
  // GET /api/jobs
  return fetch(`${API}/jobs`).then(jsonOrThrow);
}

export function fetchJob(id) {
  // GET /api/jobs/:id
  return fetch(`${API}/jobs/${id}`).then(jsonOrThrow);
}

export function createJob(payload, token) {
  // POST /api/jobs  (admin / recruiter)
  return fetch(`${API}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(token),
    },
    body: JSON.stringify(payload),
  }).then(jsonOrThrow);
}

export function deleteJob(id, token) {
  // DELETE /api/jobs/:id
  return fetch(`${API}/jobs/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(token),
    },
  }).then(async (res) => {
    if (res.status === 204) return true;
    return jsonOrThrow(res);
  });
}

/* =================== APPLICATIONS =================== */

/**
 * Get applications for the current user:
 *  - candidate: their own applications
 *  - recruiter: applications for their jobs
 *  - admin: all applications
 *
 * Backend route: GET /api/applications  (auth required)
 */
export function fetchApplications(token) {
  return fetch(`${API}/applications`, {
    headers: {
      ...authHeaders(token),
    },
  }).then(jsonOrThrow);
}

/**
 * Apply to a job.
 * For now we assume backend route:
 *   POST /api/applications
 * with payload { jobId, coverLetter }
 *
 * Your friend’s backend currently expects jobId in params,
 * but until you two sync on that, this keeps the frontend working.
 */
export function createApplication(payload, token) {
  // payload should contain at least: { jobId, coverLetter }
  return fetch(`${API}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(token),
    },
    body: JSON.stringify(payload),
  }).then(jsonOrThrow);
}

/**
 * Update application status.
 *
 * MainApp.jsx imports this, so we MUST export it.
 * Right now there is no backend endpoint for status updates in the code you showed,
 * so this is a safe stub: UI won’t crash, and you’ll see a warning in console.
 *
 * Later, when you add a real route (e.g. PATCH /api/applications/:id),
 * you can replace the stub with a real fetch.
 */
export function updateApplicationStatus(appId, status, token) {
  console.warn("updateApplicationStatus stub called", { appId, status, token });

  // Pretend it succeeded so the UI logic continues to work
  return Promise.resolve({
    id: appId,
    status,
  });
}
