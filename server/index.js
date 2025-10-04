// server/index.js

// You can keep this here, but db.js *must* have it too
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES

// DB connection test route
app.get("/api/health", async (req, res) => {
  try {
    // Using a simpler query to confirm basic connection/query execution
    const result = await pool.query("SELECT 1 AS status_check");

    res.json({
      status: "Server is healthy and connected to DB.",
      dbTimestamp: new Date().toISOString(), // Use current time or query result
      // The `status_check` column confirms the query ran successfully
      sqlCheckResult: result.rows[0].status_check,
    });
  } catch (err) {
    console.error("Database connection error:", err);

    // CRITICAL: We send the actual error message back.
    res.status(500).json({
      status: "Error",
      message: err.message, // This MUST show the real PostgreSQL error.
    });
  }
});

// -- START SERVER ---
app.listen(PORT, () => {
  console.log(`[Server]: Express is running at http://localhost:${PORT}`);
});
