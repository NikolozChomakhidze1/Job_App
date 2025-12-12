import { useState, useEffect } from "react";
import JobList from "../components/JobList.jsx";
import JobDetails from "../components/JobDetails.jsx";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <main className="page">
      <div className="container">
        <div className="grid">

          <section className="card">
            <h3 className="cardTitle">Job Listings</h3>
            <JobList
              jobs={jobs}
              selectedJobId={selectedJobId}
              onSelect={setSelectedJobId}
            />
          </section>

          <section className="card">
            <h3 className="cardTitle">Selected Job</h3>
            <JobDetails job={jobs.find(j => j.id === selectedJobId)} />
          </section>

        </div>
      </div>
    </main>
  );
}
