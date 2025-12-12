import { useState } from "react";
import "./App.css"; 
import JobList from "./components/JobList.jsx";
import JobDetails from "./components/JobDetails.jsx";


const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Amazon",
    location: "Tbo;oso",
  },
  {
    id: 3,
    title: "Fullstack Engineer",
    company: "Google",
    location: "Hybrid",
  },
];

function App() {
  const [role, setRole] = useState("candidate");
  const [jobs] = useState(mockJobs);
  const [selectedJobId, setSelectedJobId] = useState(null); 
  
  return (
    <div style = {{ padding: "20px" }}>
      <h1>Jobs and Applications Website</h1>

      <p>
        current role: <strong>{role}</strong>
      </p>

      <div style = {{ marginBottom: "1rem" }}>
        <button 
        onClick={() => setRole("candidate")}
        disabled={role === "candidate"}
        >
          Candidate
        </button>

        <button 
        onClick={() => setRole("recruiter")}
        disabled={role === "recruiter"}
        style={{ marginLeft: "10px" }}
        >
          Recruiter
        </button>
      </div>

      <hr />

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 1 }}>
          <h2>Job Listings</h2>
          <JobList 
            jobs={jobs} 
            selectedJobId={selectedJobId} 
            onSelect={setSelectedJobId} 
          />
        </div>

        <div style={{ flex: 1 }}>
          <h2>Selected Jobs</h2>
          {selectedJobId ? (
            <JobDetails job={jobs.find(j => j.id === selectedJobId)} />
          ) : (
            <p>Please select a job to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
