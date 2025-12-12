import { useState } from "react";
import { registerUser } from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await registerUser({ name, email, password });
      setSuccess("Account created successfully!");
      console.log("REGISTER OK:", res);
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <div className="container">
        <div className="authCard">
          <h2 className="authTitle">Register</h2>

          <label className="field">
            <span>Full name</span>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="primaryBtn" type="button" onClick={handleRegister}>
            Create account
          </button>

          {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
          {success && <p style={{ color: "green", marginTop: 10 }}>{success}</p>}
        </div>
      </div>
    </main>
  );
}
