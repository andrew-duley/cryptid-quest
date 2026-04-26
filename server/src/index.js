import "dotenv/config"; // Load environment variables
// require("dotenv").config(); // Load environment variables

import express from "express";
// const express = require("express");

import cors from "cors";
// const cors = require("cors");

import pg from "pg";
const { Pool } = pg;
// const { Pool } = require('pg'); // Use pool for most applications

import bcrypt from "bcrypt";

import { checkAdminKey, requireAdminSession } from "../middleware/requireAdmin.js";
import { createSessionMiddleware } from "../middleware/session.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.set("trust proxy", 1);


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://cryptid.quest",
  "https://www.cryptid.quest",
  "https://still-mode-3d71.duleyalaska.workers.dev"
];

// Configure the pool with SSL settings required for Render connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(express.json());
app.use(createSessionMiddleware(pool));
app.use(cors({ 
  origin: allowedOrigins,
  credentials: true
}));

app.get("/version", (req, res) => res.json({ ok: true, name: "cryptid-api" }));

app.get("/admin/drafts", async (req, res, next) => {
  try {
    const baseSql = "SELECT id, title, body, created_at, category FROM posts WHERE status = 'draft' ORDER BY created_at ASC";

    const result = await pool.query(baseSql);
    return res.status(200).json({ data: result.rows });
  } catch (err) {
      return next(err);
  }
});

app.get("/posts", async (req, res, next) => {
  try {
    const baseSql = "SELECT id, title, slug, category, excerpt, created_at FROM posts WHERE status = 'published' ORDER BY created_at DESC";
    const limit = Number(req.query.limit);
    const postLimit = limit > 0 && limit <= 50 ? limit : null;

    const result = postLimit ? await pool.query(`${baseSql} LIMIT $1`, [postLimit])
    :
    await pool.query(baseSql);
    return res.status(200).json({ data: result.rows, meta: { limit: postLimit } });

  } catch (err) {
      return next(err)
  }
});

app.get("/posts/:slug", async (req, res, next) => {
  try {
    const urlSlug = req.params.slug;
    const result = await pool.query("SELECT id, title, slug, category, excerpt, body, created_at FROM posts WHERE slug = $1 AND status = 'published'", [urlSlug]);
    if (result.rows.length === 0) {
      return res.status(404).json( { error: { status: 404, code: "POST_NOT_FOUND", message: "Post not found" } });
    }
    return res.status(200).json({ data: result.rows[0]});
  } catch (err) {
      return next(err)
  } 
});

// Check if there is a valid admin session
app.get("/admin/me", (req, res, next) => {
  if (req.session?.isAdmin === true) {
    return res.json({ isAuthed: true, isAdmin: true});
  }
  return res.json({ isAuthed: false });
});

// Check that email and password match
app.post("/admin/login", async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(401).json({ error: { status: 401, code: "EMAIL_OR_PASSWORD_MISSING", message: "One or more fields missing" } });
    }

    const result = await pool.query("SELECT id, email, password_hash, role FROM users WHERE email = $1", [email.trim().toLowerCase()]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: { status: 400, code: "DENIED", message: "Login denied" } }); 
    }

    if (result.rows[0].role !== "admin") {
      return res.status(403).json({ error: { status: 403, code: "ROLE_MUST_BE_ADMIN_TO_POST", message: "You must be an admin to post" } })
    }

    const passwordMatch = await bcrypt.compare(password, result.rows[0].password_hash);

    if (!passwordMatch) {
       return res.status(401).json({ error: { status: 401, code: "DENIED", message: "Login denied" } }); 
    }

      req.session.isAdmin = true;
      req.session.userId = result.rows[0].id;
      req.session.role = result.rows[0].role;
      req.session.save(err => {
        if (err) return next(err);
        return res.status(200).json({ data: {message: "Login Successful"} });
      });

  }
  catch (err) {
      return next(err);
  }
});

app.post("/admin/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log("There was a problem logging out");
      return res.status(500).json({ error: { message: "Logout failed" } });
    }
    res.clearCookie("cq.sid");

    return res.status(200).json({ data: {message: "Logout successful"} });
  })
});

app.post("/admin/posts", requireAdminSession,  async (req, res, next) => {
  let { title, slug, body, category, status="draft" } = req.body ?? {};

  function normalizeString(input) {
    return String(input ?? "")
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  title = (title ?? "").trim();
  slug = normalizeString(slug);
  body = (body ?? "").trim();
  category = (category ?? "").trim() || "Field-notes"
  category = normalizeString(category);

  // Auto generate excerpts here
  const cleanedBody = body.replace(/\s+/g, ' ').trim();

  let autoExcerpt;

  if (cleanedBody.length <= 160) {
    autoExcerpt = cleanedBody;
  } else {
    autoExcerpt = cleanedBody.slice(0, 160) + "...";
  }
   
  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!slug) slug = normalizeString(title);
  if (!slug) missingFields.push("slug");
  if (!body) missingFields.push("body");
  if (missingFields.length > 0) {
    return res.status(400).json({ error: { status: 400, code: "MISSING_FIELDS", message: `Missing required fields: ${missingFields.join(", ")}` } });
  } 
  try {
    const result = await pool.query(`INSERT INTO posts (title, slug, body, category, excerpt, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [title, slug, body, category, autoExcerpt, status]);
  
    return res.status(201).set("Location", `/posts/${slug}`).json({ data: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
        return res.status(409).json({ error: { status: 409, code: "SLUG_ALREADY_EXISTS", message: "A post with this title already exists. Try a slightly different title." } });
      }
    return next(err);
  }
});

app.put('/posts/:slug', checkAdminKey, async (req, res, next) => {
  const urlSlug = req.params.slug;
  const { title, body, category, excerpt } = req.body;
  const fields = [title, body, category, excerpt];

  if (
    !fields.every(field => typeof(field) === 'string' && field.trim()  !== "")
  ) {
    return res.status(400).json({ error: { status: 400, code: "MISSING_FIELDS", message: "One or more fields missing"} })
  }

  try {
    const didUpdate = await pool.query(`UPDATE posts SET title = $1, body = $3, category = $4, excerpt = $5 WHERE slug = $2`, [ title, urlSlug, body, category, excerpt ]);

    if (didUpdate.rowCount === 1) {
      return res.status(200).json({ data: {message: "Post updated successfully"} });
    }
    if (didUpdate.rowCount === 0) {
      return res.status(404).json({ error: { status: 404, code: "POST_NOT_FOUND", message: "Post could not be found" } });
    }
  } 
  
  catch (err) {
      return next(err);
  }
});

app.delete('/posts/:slug', checkAdminKey, async (req, res, next) => {
  const urlSlug = req.params.slug;

  try{
    const didRemove = await pool.query(`DELETE FROM posts WHERE slug = $1`, [urlSlug]);

    if (didRemove.rowCount === 1) {
      return res.status(200).json({ data: { message: "Post deleted successfully" } });
     
    } 

    if (didRemove.rowCount === 0) {
      return res.status(404).json({ error: { status: 404, code: "POST_NOT_FOUND", message: "Nothing matched that slug" } });
    }
  } catch (err) {
      return next(err);
  }
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Something went wrong";

  res.status(status).json({ error: { message, code, status }});
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});