// Import required modules
const express = require('express');
const { Pool } = require('pg');

// Create an Express application
const app = express();

// Configure PostgreSQL connection pool
const pool = new Pool({
    connectionString: "postgresql://room-to-rent_owner:0smSrBG7HgOA@ep-sparkling-haze-a7hq9c16.ap-southeast-2.aws.neon.tech/room-to-rent?sslmode=require",
    ssl: {
        rejectUnauthorized: false // Disables SSL certificate validation (for self-signed certificates)
    }
});

// Define a GET endpoint to fetch data from the database
app.get('/users', async (req, res) => {
    try {
        // Query to fetch data from the database
        const query = 'SELECT * FROM accounts';

        // Execute the query
        const { rows } = await pool.query(query);

        // Send the response with the fetched data
        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

app.get('/male', async (req, res) => {
    res.send("all males");
})

app.get("/", (req, res) => {
    res.send("Welcome to RoomToRent");
})

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});