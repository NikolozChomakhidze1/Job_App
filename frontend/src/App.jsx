import { useState } from "react";
import "./App.css"; 

function App() {
  const [role, setRole] = useState("candidate");
  
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

      <p>This arewa will later show jobs listings and application tools</p>
    </div>
  );
}

export default App;
