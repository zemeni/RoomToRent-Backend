const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/socialEvents', socialController.getSocialEvents);


module.exports = router;