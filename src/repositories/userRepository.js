// repositories/userRepository.js
const pool = require('../config/db');

const createUser = async (userData) => {
    console.log("creating user::", userData);
    try {
        const {firstname, lastname, email, password, phone, state} = userData;
        const query = {
            text: `INSERT INTO users (firstname, lastname, email, password, phone, state)
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            values: [firstname, lastname, email, password, phone, state]
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
            text: 'SELECT firstname, lastname, email, phone, state FROM users WHERE email = $1',
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
