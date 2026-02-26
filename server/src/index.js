import "dotenv/config"; // Load environment variables
// require("dotenv").config(); // Load environment variables

import express from "express";
// const express = require("express");

import cors from "cors";
// const cors = require("cors");

import pg from "pg";
const { Pool } = pg;
// const { Pool } = require('pg'); // Use pool for most applications

import { checkAdminKey, requireAdminSession } from "../middleware/requireAdmin.js";
import { createSessionMiddleware } from "../middleware/session.js";

const app = express();
const PORT = process.env.PORT || 3001;


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
app.use(cors({ origin: allowedOrigins }));

app.get("/version", (req, res) => res.json({ ok: true, name: "cryptid-api" }));

app.get("/posts", async (req, res, next) => {
  try {
    const baseSql = "SELECT id, title, slug, category, excerpt, created_at FROM posts ORDER BY created_at DESC";
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
    const result = await pool.query("SELECT id, title, slug, category, excerpt, body, created_at FROM posts WHERE slug = $1", [urlSlug])
    if (result.rows.length === 0) {
      return res.status(404).json( { error: { status: 404, code: "POST_NOT_FOUND", message: "Post not found" } });
    }
    return res.status(200).json({ data: result.rows[0]});
  } catch (err) {
      return next(err)
  } 
});

// Check to make sure ADMIN_KEY matches
app.post("/admin/login", checkAdminKey, (req, res) => {
  req.session.isAdmin = true;
  return res.status(200).json({ data: { ok: true } });
});

app.post("/posts", requireAdminSession,  async (req, res, next) => {
  const { title, slug, body, category = null, excerpt = null } = req.body ?? {};
  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!slug) missingFields.push("slug");
  if (!body) missingFields.push("body");
  if (missingFields.length > 0) {
    return res.status(400).json({ error: { status: 400, code: "MISSING_FIELDS", message: `Missing required fields: ${missingFields.join(", ")}` } });
  } 
  try {
    const result = await pool.query(`INSERT INTO posts (title, slug, body, category, excerpt) VALUES ($1, $2, $3, $4, $5) RETURNING id, created_at`, [title, slug, body, category, excerpt]);
  
    return res.status(201).set("Location", `/posts/${slug}`).json({ data: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
        return res.status(409).json({ error: { status: 409, code: "SLUG_ALREADY_EXISTS", message: "Slug already exists" } });
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

console.log("ROUTES:");
if (app.router && app.router.stack) {
  app.router.stack
    .filter(r => r.route)
    .forEach(r => {
      const methods = Object.keys(r.route.methods).join(",").toUpperCase();
      console.log(`${methods} ${r.route.path}`);
    });
} else {
  console.log("(router not initialized yet)");
}

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});