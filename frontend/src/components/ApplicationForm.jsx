import { useState } from "react";

export default function ApplicationForm({ onSubmit, disabled }) {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ candidateName, candidateEmail, notes });
    setCandidateName("");
    setCandidateEmail("");
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 14 }}>
      <h3 style={{ margin: "8px 0" }}>Apply for this job</h3>

      <div className="formRow">
        <label className="muted">Name</label>
        <input
          className="input"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          required
          disabled={disabled}
          placeholder="Your full name"
        />
      </div>

      <div className="formRow">
        <label className="muted">Email</label>
        <input
          className="input"
          value={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)}
          required
          disabled={disabled}
          placeholder="you@example.com"
        />
      </div>

      <div className="formRow">
        <label className="muted">Notes</label>
        <textarea
          className="textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={disabled}
          placeholder="Short message to recruiter (optional)"
        />
      </div>

      <button className="btn btnPrimary" type="submit" disabled={disabled} style={{ marginTop: 12 }}>
        Submit Application
      </button>
    </form>
  );
}
