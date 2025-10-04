// server/knexfile.js
require("dotenv").config({ path: "./.env" }); // Ensure .env is loaded

// Standard Knex configuration for a PostgreSQL development environment
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.PGHOST || "localhost",
      user: process.env.PGUSER || "postgres",
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT || 5432,
    },
    // Location where migration files will be stored
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations", // Knex uses this table to track executed migrations
    },
    seeds: {
      directory: "./seeds", // Optional: for inserting initial data
    },
  },
};
