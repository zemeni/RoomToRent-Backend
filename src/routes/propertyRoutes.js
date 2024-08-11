const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const roomController = require("../controllers/roomController");

router.post('/property', authMiddleware, propertyController.addProperty);
router.get('/properties', propertyController.getProperties);
router.get('/property/:id', propertyController.getPropertyById);

module.exports = router;