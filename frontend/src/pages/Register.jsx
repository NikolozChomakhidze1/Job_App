export default function Register() {
  return (
    <main className="page">
      <div className="container">
        <div className="authCard">
          <h2 className="authTitle">Register</h2>

          <label className="field">
            <span>Full name</span>
            <input className="input" type="text" placeholder="" />
          </label>

          <label className="field">
            <span>Email</span>
            <input className="input" type="email" placeholder="" />
          </label>

          <label className="field">
            <span>Password</span>
            <input className="input" type="password" placeholder="" />
          </label>

          <button className="primaryBtn" type="button">Create account</button>
        </div>
      </div>
    </main>
  );
}
