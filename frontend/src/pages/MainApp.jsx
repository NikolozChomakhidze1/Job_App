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

export default function MainApp() {
  const { user } = useAuth();
  const role = user?.role || "candidate";

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
      } catch (e) {
        console.error(e);
        setJobs([
          { id: 1, title: "Frontend Developer", company: "Tech Corp", location: "Remote", description: "React UI" },
          { id: 2, title: "Backend Developer", company: "Node Labs", location: "Tbilisi", description: "Express APIs" },
        ]);
      }
    })();
  }, []);

  async function loadApplications(jobId) {
    setAppsLoading(true);
    try {
      const data = await fetchApplications(jobId);
      setApplications(data);
    } catch (e) {
      console.error(e);
      setApplications([]);
    } finally {
      setAppsLoading(false);
    }
  }

  useEffect(() => {
    if (role === "recruiter" && selectedJobId) loadApplications(selectedJobId);
  }, [role, selectedJobId]);

  async function handleApply(formData) {
    if (!selectedJobId) return;
    try {
      await createApplication(selectedJobId, {
        ...formData,
        candidateName: formData.candidateName || user?.name,
        candidateEmail: formData.candidateEmail || user?.email,
      });
      alert("Application submitted!");
    } catch (e) {
      console.error(e);
      alert("Failed to apply (backend running?)");
    }
  }

  async function handleStatusChange(appId, status) {
    try {
      await updateApplicationStatus(appId, status);
      if (selectedJobId) await loadApplications(selectedJobId);
    } catch (e) {
      console.error(e);
      alert("Failed to update status");
    }
  }

  return (
    <div className="container">
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

              {role === "candidate" && <ApplicationForm onSubmit={handleApply} disabled={false} />}

              {role === "recruiter" && (
                <ApplicationsList
                  applications={applications}
                  loading={appsLoading}
                  onStatusChange={handleStatusChange}
                />
              )}

              {role === "admin" && (
                <p className="muted" style={{ marginTop: 12 }}>
                  Admin mode: you can later add job create/delete here.
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
