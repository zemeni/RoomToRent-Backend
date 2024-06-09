// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /signup
router.post('/signup', userController.signup);

// POST /login
router.post('/login', userController.login);

module.exports = router;
