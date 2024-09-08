const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const roomController = require("../controllers/roomController");

router.post('/property', authMiddleware, propertyController.addProperty);
router.put('/property/:id', authMiddleware, propertyController.updateProperty);
router.get('/properties', propertyController.getProperties);
router.get('/property/:id', propertyController.getPropertyById);
router.get('/propertyByUsername/:username', propertyController.getPropertyByUsername);

module.exports = router;