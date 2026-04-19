import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import TiptapEditor from '../components/TiptapEditor';

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
  const [draftSuccess, setDraftSuccess] = useState(null);
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
      setError(json.error?.message ?? "Login failed"); 
      return;
    }
    await checkAuth();
  }

  function handleEditorUpdate(newHtml) {
    setBody(newHtml);
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

  async function handlePostSubmit(status) {
    setPostSuccess(null);
    setDraftSuccess(null);
   
    if (authStatus !== "authed") {
      setError("You're not logged in!");
      return
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/admin/posts`, { method: "POST", credentials: "include", headers, body: JSON.stringify({ title, body, category, status })});

      let json = null;
      
      try {
        json = await res.json(); 
      }
      catch {}

      if (!res.ok) {
        setError(json?.error?.message ?? "Post creation failed"); 
        return;
      }

      if (status === "published") {
      setPostSuccess("Post created successfully");
      }

      if (status === "draft") {
        setDraftSuccess("Draft saved successfully");
      } 

      setTitle("");
      setBody("");
      setCategory("");

    } finally {
        setIsSubmitting(false);
    }  
  }

  async function handleLogout() {
    try {
      const res = await fetch(`${API_BASE}/admin/logout`, {
        method: "POST",
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }
      setAuthStatus("guest");
    } catch (err) {
      console.log("Logout error:", err);
    }
  }

  return(
    <PageTemplate 
      slug="admin"
      title="Admin Page"
      className="admin" 
      narrow={true} 
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
              <div className="admin__email">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" onChange={handleEmail} value={email} required />
              </div>
              
              <div className="admin__password">
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
          <form className="admin__post-form">
            <div className="admin__title">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" onChange={handleTitle} value={title} required />
            </div>

            <div className="admin__body">
              <label htmlFor="body">Body:</label>
              <TiptapEditor onEditorChange={handleEditorUpdate} />
            </div>

            <div className="admin__category">
              <label htmlFor="category">Category:</label>
              <input type="text" id="category" onChange={handleCategory} value={category} />
            </div>

            <div>
              <button type="button" className="btn" onClick={() => {handlePostSubmit('published')}} disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Submit post"}
              </button>
              <button type="button" className="btn" onClick={() => {handlePostSubmit('draft')}} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save draft"}
              </button>
            </div>
          </form>
        </Block>
      )}

      <Block title="Post Status">
        {postSuccess && <p className="success">{postSuccess}</p>}
        {draftSuccess && <p className="success">{draftSuccess}</p>}
      </Block>

      <Block title="Status/Errors">
        <p>Auth status: {authStatus}</p>
        {error && <p className="error">{error}</p>}
      </Block>

      {authStatus === "authed" && (
        <Block title="Logout">
          <button type="button" className="btn" onClick={handleLogout}>Logout</button>
        </Block>
      )}
  
      <PageFooter />
    </PageTemplate>
  );
}