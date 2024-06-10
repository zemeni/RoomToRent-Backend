// repositories/userRepository.js
const pool = require('../config/db');

const createUser = async (userData) => {
    try {
        const { firstName, lastName, email, password, phone } = userData;
        const query = {
            text: `INSERT INTO users (userId,firstName, lastName, email, password, phone) VALUES (10, $1, $2, $3, $4, $5) RETURNING *`,
            values: [firstName, lastName, email, password, phone]
        };
        const result = await pool.query(query);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const getUserByEmail = async (email) => {
    try {
        const query = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email]
        };
        const result = await pool.query(query);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const getUserProfile = async (email) => {
    try {
        const query = {
            text: 'SELECT firstname, lastname, phone FROM users WHERE email = $1',
            values: [email]
        };
        const result = await pool.query(query);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserProfile
};
