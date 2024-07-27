// services/roomService.js
const roomRepository = require('../repositories/roomRepository');
const Property = require('../models/Property');

const getAllRooms = async () => {
    return await roomRepository.getAllRooms();
}

const getRoomById = async (id) =>  {
    return await roomRepository.getRoomById(id);
}

const addRoom  = async (rooms) => {
    const results = [];
    for (const room of rooms) {
        try {
            const result = await roomRepository.addRoom(room);
            results.push(result);
        } catch (err) {
            throw err;
        }
    }
    return results;
}

module.exports = {
    getAllRooms,
    getRoomById,
    addRoom

};

