// Import required modules
const express = require('express');
const pool = require("./db");

const app = express();
const port = 3000;

//Middleware to parse json body
app.use(express.json());

app.get("/rooms", async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    }catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to RoomToRent");
})

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});