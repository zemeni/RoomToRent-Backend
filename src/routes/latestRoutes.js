const express = require('express');
const router = express.Router();
const latestController = require('../controllers/latestController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/latestInformation', latestController.getLatestInformation);


module.exports = router;