// db.js

require('dotenv').config(); // Load environment variables from .env fil

const { Pool } = require('pg');

const pool = new Pool({
    user: 'room-to-rent_owner',
    host: 'ep-sparkling-haze-a7hq9c16.ap-southeast-2.aws.neon.tech',
    database: 'room-to-rent',
    password: process.env.DB_PASSWORD.replace(/['"]+/g, ''),
    port: 5432, // Default PostgreSQL port
    ssl: {
        rejectUnauthorized: false // Disables SSL certificate validation (for self-signed certificates)
    }
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};
