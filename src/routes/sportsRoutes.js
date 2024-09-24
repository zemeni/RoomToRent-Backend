const express = require('express');
const router = express.Router();
const sportsController = require('../controllers/sportsController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/sports', sportsController.getSportsClub);


module.exports = router;