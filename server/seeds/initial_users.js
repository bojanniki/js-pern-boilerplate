// server/seeds/initial_users.js
exports.seed = function (knex) {
  // Deletes ALL existing entries in the users table before inserting new ones
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "admin", email: "admin@app.com" },
        { username: "testuser", email: "test@app.com" },
      ]);
    });
};
