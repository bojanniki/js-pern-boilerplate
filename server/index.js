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

// -- START SERVER ---
app.listen(PORT, () => {
  console.log(`[Server]: Express is running at http://localhost:${PORT}`);
});
