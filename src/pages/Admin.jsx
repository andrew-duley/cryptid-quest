import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function Admin() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [authStatus, setAuthStatus] = useState("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    setError(null);
    setAuthStatus("checking");
    fetch(`${API_BASE}/admin/me`, { credentials: "include" })
      .then(res => res.json())
      .then(json => {
        setAuthStatus(json.isAuthed && json.isAdmin ? "authed" : "guest");
      })
      .catch(err => {
        setError("Unable to verify session.");
        setAuthStatus("guest");
      })
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  async function handleSubmit(e) {
    const headers = { "Content-Type": "application/json" };
    e.preventDefault();
    setError(null);
    const res = await fetch(`${API_BASE}/admin/login`, { method: "POST", credentials: "include", headers, body: JSON.stringify({ email, password })});
    const json = await res.json();
    if (!res.ok) {
      setError(json.error?.message ?? "Login failed"); return;
    }
    await checkAuth();
  }

  return(
    <PageTemplate 
      slug="admin"
      title="Admin Page"  
    >
      {authStatus === "checking" && (
        <Block title="Admin">
          <p>Checking session...</p>
        </Block>
      )}
      
      {authStatus === "guest" && (
        <Block title="Login">
          <div className="admin__login">
            <p>Admin login.</p>
            <form onSubmit={handleSubmit}>
              <input type="email" onChange={handleEmail} value={email} />
              <input type="password" onChange={handlePassword} value={password} />
              <button type="submit">Log in</button>
            </form>
          </div>
        </Block>
      )}

      {authStatus === "authed" && (
        <Block title="Authed">
          {/*Add code for making posts here?*/}
        </Block>
      )}

      <Block title="Status/Errors">
        <p>Auth status: {authStatus}</p>
        {error && <p className="error">{error}</p>}
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}