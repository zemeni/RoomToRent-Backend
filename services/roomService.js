// services/roomService.js
const roomRepository = require('../repositories/roomRepository');

const getAllRooms = async () => {
    return await roomRepository.getAllRooms();
}

const getRoomById = async (id) =>  {
    return await roomRepository.getRoomById(id);
}

module.exports = {
    getAllRooms,
    getRoomById,
};

