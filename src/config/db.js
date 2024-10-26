// db.js
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "room_to_rent",
  password: process.env.DB_PASS || "postgres",
  port: 5432, // Default PostgreSQL port
  ssl: false,
});

module.exports = pool;
