require("dotenv").config(); // Load environment variables

const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require('pg'); // Use pool for most applications
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://cryptid.quest",
  "https://www.cryptid.quest",
  "https://still-mode-3d71.duleyalaska.workers.dev"
];

app.use(express.json());

// Middleware
app.use(cors({ origin: allowedOrigins }));

// Configure the pool with SSL settings required for Render connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/posts", async (req, res) => {
  try {
    const baseSql = "SELECT id, title, slug, category, excerpt, created_at FROM posts ORDER BY created_at DESC";
    const limit = Number(req.query.limit);
    const postLimit = limit > 0 && limit <= 50 ? limit : null;

    const result = postLimit ? await pool.query(`${baseSql} LIMIT $1`, [postLimit])
    :
    await pool.query(baseSql);
    return res.json(result.rows);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
});

app.get("/posts/:slug", async (req, res) => {
  try {
    const urlSlug = req.params.slug;
    const result = await pool.query("SELECT id, title, slug, category, excerpt, body, created_at FROM posts WHERE slug = $1", [urlSlug])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No post found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" })
  }
});

app.post("/posts",  async (req, res) => {
  const { title, slug, body, category = null, excerpt = null } = req.body;
  if (
    !title ||
    !slug ||
    !body
  ) {
    return res.status(400).json({ error: "Missing title, slug, or body" })
  }
  
  try {
    const result = await pool.query(`INSERT INTO posts (title, slug, category, excerpt, body) VALUES ($1, $2, $3, $4, $5) RETURNING id, created_at`, [title, slug, category, excerpt, body]);
  
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("DB error:", err);

    if (err.code === "23505") {
        return res.status(409).json({ error: "Slug already exists "});
      }
    return res.status(500).json({ error: "Database error"});
  }
});

app.put('/posts/:slug', async (req, res) => {
  const urlSlug = req.params.slug;
  const { title, category, excerpt, body } = req.body;
  const fields = [title, category, excerpt, body];

  if (
    !fields.every(field => typeof(field) === 'string' && field.trim()  !== "")
  ) {
    return res.status(400).json({ error: "Missing field(s). Please make sure all fields are filled" })
  }

  try {
    const postExists = await pool.query(`SELECT 1 FROM posts WHERE slug = $1 LIMIT 1`, [urlSlug]);

    if (postExists.rows.length > 0) {
      const didUpdate = await pool.query(`UPDATE posts SET title = $1, category = $2, excerpt = $3, body = $4 WHERE slug = $5`, [ title, category, excerpt, body, urlSlug ]);
      if (didUpdate.rowCount === 1) {
        return res.status(200).json({ message: 'Post has been updated'} );
      } else if (didUpdate.rowCount === 0) {
        return res.status(404).json({ error: "Sorry, post not found :("})
      } else {
        return res.status(500).json({ error: "This shouldn't happen" });
      }
    } else {
      return res.status(404).json({ error: "Sorry, post not found :("})
    }
  } catch (err) {
    console.error("DB, error: ", err);
    return res.status(500).json({ error: "Sorry, something went wrong" });
  }
});

app.delete('/posts/:slug', async (req, res) => {
  const urlSlug = req.params.slug;

  try{
    const didRemove = await pool.query(`DELETE FROM posts WHERE slug = $1`, [urlSlug]);

    if (didRemove.rowCount === 0) {
      return res.status(404).json({ error: "Nothing matched that slug >;("})
    } else if (didRemove.rowCount === 1) {
      return res.status(200).json({ message: "Post deleted successfully"})
    }
  } catch (err) {
    console.error("DB, error: ", err);
    return res.status(500).json({ error: "Sorry, something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

// ffffffffffffffffffffffffrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtgrtg  - Cat