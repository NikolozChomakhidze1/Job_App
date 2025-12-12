export default function JobList({ jobs, selectedJobId, onSelect }) {
  if (!jobs?.length) return <p className="mutedSmall">No jobs available.</p>;

  return (
    <div className="jobList">
      {jobs.map((job) => (
        <button
          key={job.id}
          type="button"
          className={`jobItem ${selectedJobId === job.id ? "jobItemActive" : ""}`}
          onClick={() => onSelect(job.id)}
        >
          <div className="jobTitle">{job.title}</div>
          <div className="jobMeta">
            {job.company} · {job.location}
          </div>
        </button>
      ))}
    </div>
  );
}
