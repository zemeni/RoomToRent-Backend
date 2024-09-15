// repositories/userRepository.js
const pool = require('../config/db');

const createUser = async (userData) => {
    console.log("creating user::", userData);
    try {
        const {firstname, lastname, email, password, phone, country, state} = userData;
        const query = {
            text: `INSERT INTO users (firstname, lastname, email, password, phone, country, state)
                   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            values: [firstname, lastname, email, password, phone, country, state]
        };
        await pool.query(query);
        return {success: true, message: "User created successfully"};
    } catch (err) {
        return {success: false, message: err.message};
    }
};

const getUserByEmail = async (email) => {
    try {
        const query = {
            text: 'SELECT * FROM users WHERE email = $1 AND active = true',
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
            text: 'SELECT firstname, lastname, email, phone, country, state FROM users WHERE email = $1',
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
