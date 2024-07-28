// db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "room_to_rent",
  password: "admin",
  port: 5432, // Default PostgreSQL port
  ssl: false,
});

module.exports = pool;
