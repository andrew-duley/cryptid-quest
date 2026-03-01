import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function Admin() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [authStatus, setAuthStatus] = useState("checking");
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

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
          <p>Please login.</p>
        </Block>
      )}

      {authStatus === "authed" && (
        <Block title="Status/Errors">
          <p>Auth status: {authStatus}</p>
          {error && <p className="error">{error}</p>}
        </Block>
      )}

      <PageFooter />
    </PageTemplate>
  );
}