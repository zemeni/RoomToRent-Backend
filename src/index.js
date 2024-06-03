const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { neon, neonConfig } = require('@neondatabase/serverless'); //commonjs


async function dbClient() {
  //for http connections
  //non-pooling
  neonConfig.fetchConnectionCache = true
  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

app.get("/", async (req, res, next) => {
  const sql = await dbClient();
  const results = await sql`select NOW();`
  return res.status(200).json({
    message: "Welcome to RoomToRent!",
    results: results,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from RoomToRent!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

/*app.listen(3000, () => {
  console.log("running at http://localhost:3000")
})*/

exports.handler = serverless(app);
