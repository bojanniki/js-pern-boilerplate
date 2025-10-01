//server/index.js
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//--- ROUTES

//DB connection test route
app.get("/api/health", async (req, res) => {
  try {
    const result = pool.query("SELECT NOW()");
    res.json({
      status: "Server is healthy and connected to DB.",
      dbTimestamp: result.rows[0].now,
    });
  } catch (err) {
    console.error("Database connection error:", err);
    //Do not expose err.message in production but helpful for boilerplate
    res.status(500).json({
      status: "Error",
      message:
        "Failed to connect to database.Check your .env file and POSTgreSQL service",
    });
  }
});

// -- START SERVER ---
app.listen(PORT, () => {
  console.log(`[Server]: Express is running at http://localhost:${PORT}`);
});
