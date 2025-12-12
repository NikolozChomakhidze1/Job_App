import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";

import JobList from "../components/JobList.jsx";
import JobDetails from "../components/JobDetails.jsx";
import ApplicationForm from "../components/ApplicationForm.jsx";

import { fetchJobs, createApplication } from "../api.js";

export default function Home() {
  const { user, token } = useAuth();
  const role = user?.role || "guest";

  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);

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
        setJobs([]);
      }
    })();
  }, []);

  async function handleApply({ coverLetter }) {
    if (!selectedJobId) return;

    if (!user || !token) {
      alert("Please login to apply.");
      return;
    }

    // Your backend uses role "user" for applying
    if (role !== "user") {
      alert("Only normal users can apply to jobs.");
      return;
    }

    setApplyLoading(true);
    try {
      await createApplication(selectedJobId, { coverLetter }, token);
      alert("Application submitted!");
    } catch (e) {
      alert(e?.message || "Apply failed (check backend + route)");
    } finally {
      setApplyLoading(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <div className="grid">
        <div className="card">
          <h2 className="cardTitle">Job Listings</h2>
          <JobList
            jobs={jobs}
            selectedJobId={selectedJobId}
            onSelect={setSelectedJobId}
          />
        </div>

        <div className="card">
          <h2 className="cardTitle">Selected Job</h2>

          {selectedJob ? (
            <>
              <JobDetails job={selectedJob} />

              {role === "user" && (
                <ApplicationForm onSubmit={handleApply} loading={applyLoading} />
              )}

              {!user && (
                <p className="muted" style={{ marginTop: 12 }}>
                  Login/Register to apply.
                </p>
              )}
            </>
          ) : (
            <p className="muted">No job selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}
