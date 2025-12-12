function JobDetails({ job }) {
    if (!job) {
        return <p>No job selected.</p>;
    }
    return (
        <div>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p>{job.description || "No description available"}</p>
        </div>
    );
}
export default JobDetails;