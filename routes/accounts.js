const express  = require('express');
const router = express.Router();
const db = require('../db');


//GET all accounts
router().get("/users", async (req, res, next) => {
    try {
        const {rows} = await db.query('SELECT * from accounts');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({error: 'An interrupted exception occurred'})
    }
});

module.exports = router;