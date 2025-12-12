import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";

import JobList from "../components/JobList.jsx";
import JobDetails from "../components/JobDetails.jsx";
import ApplicationForm from "../components/ApplicationForm.jsx";
import ApplicationsList from "../components/ApplicationsList.jsx";

import {
  fetchJobs,
  fetchApplications,
  createApplication,
  updateApplicationStatus,
} from "../api.js";

const mockJobs = [
  { id: 1, title: "Frontend Developer", company: "Tech Corp", location: "Remote", description: "Build UI in React." },
  { id: 2, title: "Backend Developer", company: "Node Labs", location: "Tbilisi", description: "Build Express APIs." },
  { id: 3, title: "Fullstack Engineer", company: "Google", location: "Hybrid", description: "React + Node + DB." },
];

export default function Home() {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);

  const selectedJob = useMemo(
    () => jobs.find((j) => j.id === selectedJobId) || null,
    [jobs, selectedJobId]
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch {
        // if backend not running yet
        setJobs(mockJobs);
      }
    })();
  }, []);

  async function loadApplications(jobId) {
    setAppsLoading(true);
    try {
      const data = await fetchApplications(jobId);
      setApplications(data);
    } catch {
      setApplications([]);
    } finally {
      setAppsLoading(false);
    }
  }

  useEffect(() => {
    if (role === "recruiter" && selectedJobId) loadApplications(selectedJobId);
    // eslint-disable-next-line
  }, [role, selectedJobId]);

  async function handleApply(formData) {
    if (!selectedJobId) return;

    // must be logged in as candidate
    if (!user) {
      alert("Please login/register as a candidate to apply.");
      return;
    }
    if (user.role !== "candidate") {
      alert("Only candidates can apply.");
      return;
    }

    try {
      await createApplication(selectedJobId, {
        candidateName: user.name,
        candidateEmail: user.email,
        notes: formData.notes || "",
      });
      alert("Application submitted!");
    } catch {
      alert("Apply failed (is backend running?)");
    }
  }

  async function handleStatusChange(appId, status) {
    try {
      await updateApplicationStatus(appId, status);
      if (selectedJobId) await loadApplications(selectedJobId);
    } catch {
      alert("Failed to update status");
    }
  }

  return (
    <div className="container" style={{ paddingTop: 28 }}>
      <div className="grid">
        <div className="card">
          <h2 className="cardTitle">Job Listings</h2>
          <JobList jobs={jobs} selectedJobId={selectedJobId} onSelect={setSelectedJobId} />
        </div>

        <div className="card">
          <h2 className="cardTitle">Selected Job</h2>

          {selectedJob ? (
            <>
              <JobDetails job={selectedJob} />

              
              {user?.role === "candidate" && (
                <ApplicationForm onSubmit={handleApply} />
              )}

              
              {user?.role === "recruiter" && (
                <ApplicationsList
                  applications={applications}
                  loading={appsLoading}
                  onStatusChange={handleStatusChange}
                />
              )}

              {/* Guest message */}
              {!user && (
                <p className="muted" style={{ marginTop: 12 }}>
                  Login/Register to apply (candidate) or review applications (recruiter).
                </p>
              )}
            </>
          ) : (
            <p className="muted">Select a job to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
