export default function ApplicationsList({ applications, onStatusChange, loading }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ margin: "8px 0" }}>Applications</h3>

      {loading ? (
        <p className="muted">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="muted">No applications yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Email</th>
              <th>Status</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.candidateName}</td>
                <td className="muted">{app.candidateEmail}</td>
                <td>{app.status}</td>
                <td>
                  <select
                    className="select"
                    value={app.status}
                    onChange={(e) => onStatusChange(app.id, e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="reviewing">reviewing</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
