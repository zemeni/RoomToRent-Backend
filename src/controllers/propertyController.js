const propertyService = require('../services/propertyService');

const addProperty = async (req, res) => {
    console.log("inside add property with valid token")
    try {
        const propertyData = req.body;
        const newProperty = await propertyService.addProperty(propertyData);
        res.status(201).json(newProperty);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addProperty,
};
