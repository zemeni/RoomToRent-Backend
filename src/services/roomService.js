// services/roomService.js
const roomRepository = require('../repositories/roomRepository');
const Property = require('../models/Property');

const getAllRooms = async () => {
    return await roomRepository.getAllRooms();
}

const getRoomById = async (id) =>  {
    return await roomRepository.getRoomById(id);
}

const addRoom  = async (property) => {
    try {

    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllRooms,
    getRoomById,
    addRoom

};

