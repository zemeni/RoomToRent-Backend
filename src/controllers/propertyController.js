const propertyServiceFactory = require('../services/propertyServiceFactory');

const addProperty = async (req, res) => {
    try {
        const userId = req.user.userId;
        const propertiesWithUserId = req.body.map(property => ({...property, userId}));

        const results = [];
        for (const property of propertiesWithUserId) {
            const service = propertyServiceFactory.getService(property.type);
            const result = await service.add(property);
            results.push(result);
        }
        res.status(201).json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addProperty
}
