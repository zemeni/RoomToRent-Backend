const PropertyServiceFactory = require('../services/propertyServiceFactory');

const PropertyService = require('../services/propertyService');
const propertyServiceFactory = new PropertyServiceFactory(); // No arguments needed here
const propertyService = new PropertyService(propertyServiceFactory); // Pass the factory instance


const addProperty = async (req, res) => {
    console.log("adding properties ", req.user.userId);
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
    try {
        const { id } = req.params;
        const type = req.body.type;
        console.log("updating property of id and type", id, type);
        const service = PropertyServiceFactory.getService(type);
        const result = await service.update(id, req.body);
        console.log("updated value is ", result);

        res.status(201).json({ success: true, data: result });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query;
        console.log("I am deleting the property of id and type ", id, type);
        const service = PropertyServiceFactory.getService(type);
        const result = await service.delete(id);
        res.status(200).json({success: true})
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }

}


const getProperties = async (req, res) => {
    try {
        const state = req.query.state;  // Assuming state is passed as a query parameter
        console.log("getting properties for state ", state);
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

        const property = await propertyService.getPropertyByIdAndType(id, type);
        res.status(200).json(property);
    } catch (err) {
        console.error('Error fetching property details:', err);
        res.status(500).send('Server Error');
    }
}

const getPropertyByUsername = async (req, res) => {
    try {
        const { username } = req.params; // Extracts 'type' from query parameters
        const property = await propertyService.getPropertyByUsername(username);
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
    getPropertyByUsername,
    deleteProperty
}
