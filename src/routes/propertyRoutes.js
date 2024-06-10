const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/properties', authMiddleware, propertyController.addProperty);

module.exports = router;
