const roomService = require('../services/roomService');

const getAllRooms = async (req, res) => {
    console.log("inside room controller")
    try {
        const rooms = await roomService.getAllRooms();
        res.status(200).json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getRoomById = async (req, res) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        if (!room) {
            return res.status(404).send('Room not found');
        }
        res.status(200).json(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const addRoom = async (req, res) => {
    try {
        const userId = req.user.userId;
        const roomsWithUserId = req.body.map(room => ({...room, userId}))
        const result = await  roomService.addRoom(roomsWithUserId);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getAllRooms,
    getRoomById,
    addRoom
};