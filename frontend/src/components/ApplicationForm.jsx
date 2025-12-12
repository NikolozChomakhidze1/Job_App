import { useState } from "react";

export default function ApplicationForm({ onSubmit, loading }) {
  const [coverLetter, setCoverLetter] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({ coverLetter });
    setCoverLetter("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 14 }}>
      <h3 style={{ margin: "8px 0" }}>Apply</h3>

      <label className="label">Cover letter (optional)</label>
      <textarea
        className="textarea"
        rows={4}
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Write a short message…"
      />

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Applying..." : "Apply to this job"}
      </button>
    </form>
  );
}
