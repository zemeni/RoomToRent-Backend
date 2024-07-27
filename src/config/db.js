// db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "room_to_rent",
  password: "Sub1995",
  port: 5432, // Default PostgreSQL port
  ssl: false,
});
const checkDBConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Successfully connected to database");
    client.release();
  } catch (e) {
    console.error(e);
  }
};

module.exports = { pool, checkDBConnection };
