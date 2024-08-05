const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/property', authMiddleware, propertyController.addProperty);

module.exports = router;