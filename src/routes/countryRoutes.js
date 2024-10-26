const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');


router.get('/countries', countryController.getAllCountries);


module.exports = router;