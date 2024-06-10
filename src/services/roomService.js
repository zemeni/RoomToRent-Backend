// services/roomService.js
const roomRepository = require('../repositories/roomRepository');
const Property = require('../models/Property');

const getAllRooms = async () => {
    return await roomRepository.getAllRooms();
}

const getRoomById = async (id) =>  {
    return await roomRepository.getRoomById(id);
}

const addRoom  = async (propertyData) => {
    try {
        const property = new Property(
            propertyData.ownerid,
            propertyData.description,
            propertyData.numberofrooms,
            propertyData.numberofbathroom,
            propertyData.numberofparking,
            propertyData.price,
            propertyData.availablefrom,
            propertyData.availableto
        );
        //TODO::Add Room and getID
        console.log("property is ", property)
        return await roomRepository.createProperty(property);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllRooms,
    getRoomById,

};

