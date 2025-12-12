export default function Login() {
  return (
    <main className="page">
      <div className="container">
        <div className="authCard">
          <h2 className="authTitle">Login</h2>

          <label className="field">
            <span>Email</span>
            <input className="input" type="email" placeholder="" />
          </label>

          <label className="field">
            <span>Password</span>
            <input className="input" type="password" placeholder="" />
          </label>

          <button className="primaryBtn" type="button">Login</button>

          <p className="mutedSmall" style={{ marginTop: 10 }}>
            (UI only for now — we’ll connect backend next)
          </p>
        </div>
      </div>
    </main>
  );
}
