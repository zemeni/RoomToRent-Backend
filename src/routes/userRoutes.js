const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.post('/profile', authMiddleware, userController.profile);

module.exports = router;
