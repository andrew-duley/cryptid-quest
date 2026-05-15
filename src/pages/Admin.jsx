import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import TiptapEditor from '../components/TiptapEditor';
import Drafts from '../components/Drafts';
import PublishedPosts from '../components/PublishedPosts';

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
  const [heroImageUrl, setHeroImageUrl] = useState(null);
  const [heroImageAlt, setHeroImageAlt] = useState(null);

  const [draftSuccess, setDraftSuccess] = useState(null);
  const [postSuccess, setPostSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [draftsError, setDraftsError] = useState(null);
  const [publishedPostsError, setPublishedPostsError] = useState(null);

  const [draftsLoading, setDraftsLoading] = useState(false);
  const [publishedPostsLoading, setPublishedPostsLoading] = useState(false);

  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);

  const [publishedPosts, setPublishedPosts] = useState([]);
  const [selectedPublishedPost, setSelectedPublishedPost] = useState(null);

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
    setTitle(e.target.value);
  }

  function handleBody(e) {
    setBody(e.target.value);
  }

  function handleCategory(e) {
    setCategory(e.target.value);
  }

  async function handleHeroImageUrl(e) {
    setHeroImageUrl(e.target.value);
  }

  async function handleHeroImageAlt(e) {
    setHeroImageAlt(e.target.value);
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

    const selectedPost = selectedDraft ?? selectedPublishedPost;

    if (selectedPost) {
      methodToUse = "PUT";
      urlToUse = `${API_BASE}/admin/posts/${selectedPost.id}`;
    } else {
      methodToUse = "POST";
      urlToUse = `${API_BASE}/admin/posts`;
    }

    try {
      const res = await fetch(urlToUse, { method: methodToUse, credentials: "include", headers, body: JSON.stringify({ title, body, category, status, hero_image_url: heroImageUrl, hero_image_alt: heroImageAlt })});

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
        setSelectedPublishedPost(null);
        setSelectedDraft(null);
        setTitle("");
        setHeroImageUrl("");
        setHeroImageAlt("");
        setBody("");
        setCategory(""); 

        await fetchDrafts();
        await fetchPublishedPosts();
      }

      if (status === "draft") {
        setDraftSuccess("Draft saved successfully");
        await fetchDrafts();
      } 
    } finally {
        setIsSubmitting(false);
    }  
    console.log("selectedDraft before submit:", selectedDraft);
  }

  async function fetchDrafts() {
    setDraftsError(null);
    setDraftsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/drafts`, { method: "GET", credentials: "include"} );

      let json = null;
        
      try {
        json = await res.json(); 
      }
      catch {}

      if (!res.ok) {
        setDraftsError(json?.error?.message ?? "Unable to fetch drafts"); 
        return;
      }

      if (!Array.isArray(json?.data)) {
        setDraftsError(json?.error?.message ?? "Unexpected return value"); 
        return;
      }

      setDrafts(json.data ?? []);
    } finally {
      setDraftsLoading(false);
    }
  }

  async function fetchPublishedPosts() {
    setPublishedPostsError(null);
    setPublishedPostsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/posts`, { method: "GET", credentials: "include"} );

      let json = null;
        
      try {
        json = await res.json(); 
      }
      catch (err) {
        console.log("Error parsing JSON:", err);
      }
      if (!res.ok) {
        setPublishedPostsError(json?.error?.message ?? "Unable to fetch published posts"); 
        return;
      }

      if (!Array.isArray(json?.data)) {
        setPublishedPostsError(json?.error?.message ?? "Unexpected return value"); 
        return;
      }

      setPublishedPosts(json.data ?? []);
    } finally {
      setPublishedPostsLoading(false);
    }
  }

  useEffect(() => {
    fetchDrafts();
  }, []);

  useEffect(() => {
    fetchPublishedPosts();
  }, []);

  function onSelectedDraft(draft) {

    const loadDraftIntoForm = () => {
      setTitle(draft.title);
      setHeroImageUrl(draft.hero_image_url);
      setHeroImageAlt(draft.hero_image_alt);
      setBody(draft.body);
      setCategory(draft.category);
      setSelectedDraft(draft);
      setSelectedPublishedPost(null);
    }

    if (!title && !body) {
      loadDraftIntoForm();
    } else {

      if (confirm("Are you sure you want to load this draft? If so, make sure your current draft is saved.")) {
        loadDraftIntoForm();
      }
    }
  }

  function onSelectedPublishedPost(post) {

    const loadPublishedPostIntoForm = () => {
      setTitle(post.title);
      setHeroImageUrl(post.hero_image_url);
      setHeroImageAlt(post.hero_image_alt);
      setBody(post.body);
      setCategory(post.category);
      setSelectedPublishedPost(post);
      setSelectedDraft(null);
    }

    if (!title && !body) {
      loadPublishedPostIntoForm();
    } else {

      if (confirm("Are you sure you want to load this published post?")) {
        loadPublishedPostIntoForm();
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
  
  let draftsContent;
  let publishedPostsContent;

  // Logic of what to show in the drafts area
  if (draftsLoading) {
    draftsContent = <p>Loading drafts...</p>
  } else if (draftsError) {
    draftsContent = <p>{draftsError}</p>
  } else if (drafts.length === 0) {
    draftsContent = <p>No drafts yet</p>
  } else {
    draftsContent = <Drafts drafts={drafts} onSelectedDraft={onSelectedDraft} />
  }

  // Logic of what to show in the published posts area
  if (publishedPostsLoading) {
    publishedPostsContent = <p>Loading published posts...</p>
  } else if (publishedPostsError) {
    publishedPostsContent = <p>{publishedPostsError}</p>
  } else if (publishedPosts.length === 0) {
    publishedPostsContent = <p>No published posts yet</p>
  } else {
    publishedPostsContent = <PublishedPosts publishedPosts={publishedPosts} onSelectedPublishedPost={onSelectedPublishedPost} />
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

            <div className="admin__hero-image">
              <div className="admin__hero-image--url">
                <label htmlFor="hero-image-url">Hero Image URL:</label>
                <input type="text" id="hero-image-url" onChange={handleHeroImageUrl} value={heroImageUrl} />
              </div>
              <div className="admin__hero-image--alt">
                <label htmlFor="hero-image-alt">Hero Image Alt:</label>
                <input type="text" id="hero-image-alt" onChange={handleHeroImageAlt} value={heroImageAlt} />
              </div>
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
                {isSubmitting ? "Posting..." : selectedPublishedPost ? "Update post" : "Publish post"}
              </button>
              <button type="button" className="btn" onClick={() => {handlePostSubmit('draft')}} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : selectedPublishedPost ? "Unpublish to draft" : "Save draft"}
              </button>
            </div>
          </form>

          <div className="posts drafts">
            {draftsContent}
          </div>

          <div className="posts published">
            {publishedPostsContent}
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