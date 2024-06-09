const express  = require('express');
const router = express.Router();
const db = require('../config/db');


//GET all accounts
router.get("/", async (req, res, next) => {
    try {
        const {rows} = await db.query('SELECT * from accounts');
        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({error: 'An interrupted exception occurred'})
    }
});

module.exports = router;