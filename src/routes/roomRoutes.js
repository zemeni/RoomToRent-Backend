const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/rooms', roomController.getAllRooms);
router.get('/rooms/:id', roomController.getRoomById);
// router.post('/rooms', authMiddleware, roomController.createProperty);

module.exports = router;
