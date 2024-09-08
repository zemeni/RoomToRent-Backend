const PropertyServiceFactory = require('../services/propertyServiceFactory');

const PropertyService = require('../services/propertyService');
const propertyServiceFactory = new PropertyServiceFactory(); // No arguments needed here
const propertyService = new PropertyService(propertyServiceFactory); // Pass the factory instance


const addProperty = async (req, res) => {
    try {
        const userId = req.user.userId;
        const propertiesWithUserId = req.body.map(property => ({...property, userId}));

        const results = [];
        for (const property of propertiesWithUserId) {
            const service = PropertyServiceFactory.getService(property.type);
            const result = await service.add(property);
            results.push(result);
        }
        res.status(201).json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateProperty = async (req, res) => {
    console.log("update this property ", req.body);
    res.status(201).json({"success":"true"});
};

const getProperties = async (req, res) => {
    try {
        const state = req.query.state;  // Assuming state is passed as a query parameter
        const properties = await propertyService.getProperties(state);
        res.status(200).json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params; // Extracts 'id' from URL parameters
        const { type } = req.query; // Extracts 'type' from query parameters

        console.log("id and type in backend ", id, type);
        const property = await propertyService.getPropertyByIdAndType(id, type);
        console.log("response is ", property);
        res.status(200).json(property);
    } catch (err) {
        console.error('Error fetching property details:', err);
        res.status(500).send('Server Error');
    }
}

const getPropertyByUsername = async (req, res) => {
    try {
        const { username } = req.params; // Extracts 'type' from query parameters
        console.log("username is ", username);
        const property = await propertyService.getPropertyByUsername(username);
        console.log("response is ", property);
        res.status(200).json(property);
    } catch (err) {
        console.error('Error fetching property details:', err);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    addProperty,
    updateProperty,
    getProperties,
    getPropertyById,
    getPropertyByUsername
}
