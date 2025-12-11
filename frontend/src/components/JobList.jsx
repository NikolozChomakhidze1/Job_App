function JobList({ jobs, selectedJobId, onSelect }) {
    if (!jobs || jobs.length === 0) {
        return <p>No jobs available.</p>;
    }
    
    return (
        <ul style={{listStyle: "none", padding: 0 }}>   
            {jobs.map((job) => (
                <li 
                    key={job.id}
                    onClick={() => onSelect(job.id)}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        marginBottom: "8px",
                        cursor: "pointer",
                        backgroundColor: selectedJobId === job.id ? "#f0f0f0" : "white",
                        color: "#000"
                    }}
                >
                    <strong>{job.title}</strong>
                    <div>{job.company}</div>
                    <small>{job.location}</small>
                </li>
            ))}
        </ul>
    );
}

export default JobList;


