// db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'room_to_rent_owner',
    host: 'ep-sparkling-haze-a7hq9c16.ap-southeast-2.aws.neon.tech',
    database: 'room-to-rent',
    password: '0smSrBG7HgOA',
    port: 5432, // Default PostgreSQL port
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};
