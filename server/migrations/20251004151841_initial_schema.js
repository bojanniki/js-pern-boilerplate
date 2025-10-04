// server/migrations/TIMESTAMP_initial_schema.js

// The 'up' function creates the tables
exports.up = function (knex) {
  return (
    knex.schema
      // Create the Users Table
      .createTable("users", function (table) {
        table.increments("user_id").primary(); // Primary key, auto-incrementing
        table.string("username", 50).unique().notNullable();
        table.string("email", 100).unique().notNullable();
        table.timestamps(true, true); // Adds created_at and updated_at columns
        table.boolean("is_active").defaultTo(true);
      })
      // Example: Create a Posts Table
      .createTable("posts", function (table) {
        table.increments("post_id").primary();
        table
          .integer("user_id")
          .references("user_id") // Foreign key to the users table
          .inTable("users")
          .onDelete("CASCADE"); // If user is deleted, delete their posts
        table.string("title").notNullable();
        table.text("content");
        table.timestamps(true, true);
      })
  );
};

// The 'down' function reverses the changes (e.g., used when rolling back a faulty migration)
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
