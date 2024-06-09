// repositories/userRepository.js
const pool = require('../config/db');

const createUser = async (userData) => {
    try {
        const { firstname, lastname, email, password, phone } = userData;
        const query = {
            text: `INSERT INTO users (firstname, lastname, email, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            values: [firstname, lastname, email, password, phone]
        };
        const result = await pool.query(query);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const getUserByEmailAndPassword = async (email, password) => {
    try {
        const query = {
            text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
            values: [email, password]
        };
        const result = await pool.query(query);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createUser,
    getUserByEmailAndPassword,
};
