import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import TiptapEditor from '../components/TiptapEditor';
import Draft from '../components/Drafts';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);

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

    let methodToUse;
    let urlToUse;

    if (selectedDraft) {
      methodToUse = "PUT";
      urlToUse = `${API_BASE}/admin/posts/${selectedDraft.id}`;
    } else {
      methodToUse = "POST";
      urlToUse = `${API_BASE}/admin/posts`;
    }

    try {
      const res = await fetch(urlToUse, { method: methodToUse, credentials: "include", headers, body: JSON.stringify({ title, body, category, status })});

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
        setSelectedDraft(null);
        setTitle("");
        setBody("");
        setCategory(""); 
      }

      if (status === "draft") {
        setDraftSuccess("Draft saved successfully");
      } 
    } finally {
        setIsSubmitting(false);
    }  
  }

  useEffect(() => {
    async function fetchDrafts() {
      setError(null);
      setIsLoading(true);

      try {
        const res = await fetch(`${API_BASE}/admin/drafts`, { method: "GET", credentials: "include"} );

        let json = null;
          
        try {
          json = await res.json(); 
        }
        catch {}

        if (!res.ok) {
          setError(json?.error?.message ?? "Unable to fetch drafts"); 
          return;
        }

        if (!Array.isArray(json?.data)) {
          setError(json?.error?.message ?? "Unexpected return value"); 
          return;
        }

        setDrafts(json.data ?? []);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDrafts();
  }, []);

  function onSelectDraft(draft) {

    const loadDraftIntoForm = () => {
      setTitle(draft.title);
      setBody(draft.body);
      setCategory(draft.category);
      setSelectedDraft(draft);
    }

    if (!title && !body && !category) {
      loadDraftIntoForm();
    } else {

      if (confirm("Are you sure you want to load this draft? If so, make sure your current draft is saved.")) {
        loadDraftIntoForm();
      }
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
  
  let content;

  if (isLoading) {
    content = <p>Loading drafts...</p>
  } else if (error) {
    content = <p>{error}</p>
  } else if (drafts.length === 0) {
    content = <p>No drafts yet</p>
  } else {
    content = <Draft drafts={drafts}/>
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
              <TiptapEditor body={body} onEditorChange={handleEditorUpdate} />
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

          <div className="drafts">
            {content}
          </div>
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