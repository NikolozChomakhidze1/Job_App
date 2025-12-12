export default function JobDetails({ job }) {
  if (!job) return <p className="mutedSmall">Select a job to see details.</p>;

  return (
    <div className="jobDetails">
      <h4 className="jobDetailsTitle">{job.title}</h4>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p className="mutedSmall">{job.description || "No description available."}</p>
    </div>
  );
}
