const countryService = require('../services/countryService');

const getAllCountries= async (req, res) => {
    try {
        const properties = await countryService.getCountries();
        res.status(200).json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllCountries
}