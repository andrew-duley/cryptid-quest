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

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [postSuccess, setPostSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const headers = { "Content-Type": "application/json" };

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    setError(null);
    setAuthStatus("checking");
    fetch(`${API_BASE}/admin/me`, { credentials: "include" })
      .then(res => {
        if (!res.ok) return { isAuthed: false, isAdmin: false };
        return res.json();
      })
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

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError(null);
    const headers = { "Content-Type": "application/json" };
    const res = await fetch(`${API_BASE}/admin/login`, { method: "POST", credentials: "include", headers, body: JSON.stringify({ email, password })});
    const json = await res.json();
    if (!res.ok) {
      setError(json.error?.message ?? "Login failed"); return;
    }
    await checkAuth();
  }

  function handleTitle(e) {
    setTitle(e.target.value)
  }

  function handleBody(e) {
    setBody(e.target.value)
  }

  function handleCategory(e) {
    setCategory(e.target.value)
  }

  async function handlePostSubmit(e) {
    setPostSuccess(null);
    e.preventDefault();
    if (authStatus !== "authed") {
      setError("You're not logged in!");
      return
    }

    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/admin/posts`, { method: "POST", credentials: "include", headers, body: JSON.stringify({ title, body, category })});

      let json = null;
      
      try {
        json = await res.json(); 
      }
      catch {}

      if (!res.ok) {
        setError(json?.error?.message ?? "Post creation failed"); return;
      }
    } finally {
      setIsSubmitting(false);
    }

    setPostSuccess("Post created successfully");
    setTitle("");
    setBody("");
    setCategory("");
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
            <form onSubmit={handleLoginSubmit}>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={handleEmail} value={email} required />
              </div>
              
              <div>
                <label htmlFor="password">Password</label>
                <input type="password"  id="password" onChange={handlePassword} value={password} required />
              </div>
          
              <div>
                <button type="submit" className="btn">Log in</button>
              </div>
              
            </form>
          </div>
        </Block>
      )}

      {authStatus === "authed" && (
        <Block title="Authed">
          {postSuccess && <p className="success">{postSuccess}</p>}
          <form className="authed__post-form" onSubmit={handlePostSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" onChange={handleTitle} value={title} required />
            </div>

            <div>
              <label htmlFor="body">Body:</label>
              <textarea id="body" onChange={handleBody} value={body} required />
            </div>

            <div>
              <label htmlFor="category">Category:</label>
              <input type="text" id="category" onChange={handleCategory} value={category} />
            </div>

            <div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Submit post"}
              </button>
            </div>
          </form>
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