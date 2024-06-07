// db.js
// db.js
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://room-to-rent_owner:0smSrBG7HgOA@ep-sparkling-haze-a7hq9c16.ap-southeast-2.aws.neon.tech/room-to-rent?sslmode=require",
    ssl: {
        rejectUnauthorized: false // Disables SSL certificate validation (for self-signed certificates)
    }
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};

