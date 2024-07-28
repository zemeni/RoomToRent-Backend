// services/roomService.js
const roomRepository = require('../repositories/roomRepository');
const Property = require('../models/Property');
const getCoordinatesFromAddress = require("../util/geocodeConverter");

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
            let existingCount = await roomRepository.getRoomsAtAddress(room.address);
            console.log("existing count is ", existingCount);
            const {latitude, longitude} = await getCoordinatesFromAddress(room.address);
            if (latitude && longitude) {
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            } else {
                console.log('Failed to get coordinates.');
            }
            let adjustedRoom = await adjustCoordinatesForRoom(room, latitude, longitude, existingCount);
            console.log("adjusted room is ", adjustedRoom);
            const result = await roomRepository.addRoom(adjustedRoom);
            results.push(result);
        } catch (err) {
            throw err;
        }
    }
    return results;
}

const adjustCoordinatesForRoom = async (room, latitude, longitude, existingCount) => {
    console.log("before adjustment ", latitude, longitude, existingCount);
    const adjustment = 0.00002; // Adjust this value as needed
    const angle = (360 / (existingCount + 1)) * existingCount;
    const radian = angle * (Math.PI / 180);
    latitude += adjustment * Math.cos(radian); // Assuming room object contains latitude and longitude
    longitude += adjustment * Math.sin(radian);
    room.latitude = latitude;
    room.longitude = longitude;
    return room;
};


module.exports = {
    getAllRooms,
    getRoomById,
    addRoom
};

