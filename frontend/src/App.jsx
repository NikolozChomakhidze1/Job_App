import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";

import JobList from "./components/JobList.jsx";
import JobDetails from "./components/JobDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const jobsData = [
  { id: 1, title: "Frontend Developer", company: "Tech Corp", location: "Remote" },
  { id: 2, title: "Backend Developer", company: "Node Labs", location: "Tbilisi" },
  { id: 3, title: "Fullstack Engineer", company: "Google", location: "Hybrid" },
];

function Home() {
  const [selectedJobId, setSelectedJobId] = useState(null);

  return (
    <main className="page">
      <div className="container">
        <div className="grid">
          <section className="card">
            <h3 className="cardTitle">Job Listings</h3>
            <JobList
              jobs={jobsData}
              selectedJobId={selectedJobId}
              onSelect={setSelectedJobId}
            />
          </section>

          <section className="card">
            <h3 className="cardTitle">Selected Job</h3>
            <JobDetails job={jobsData.find(j => j.id === selectedJobId)} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="appRoot">
      <header className="topbar">
        <div className="topbarInner">
          <Link to="/" className="brand">JobApp</Link>

          <nav className="topbarRight">
            <Link className="navLink" to="/login">Login</Link>
            <Link className="navButton" to="/register">Register</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
