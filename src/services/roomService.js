const roomRepository = require('../repositories/roomRepository');
const {getCoordinatesFromAddress, adjustCoordinatesForProperty, getPlaceDetails} = require("../util/geocodeConverter");

const getAllRooms = async (state) => {
    return await roomRepository.getAllMarkerRooms(state);
}

const getRoomById = async (id) => {
    return await roomRepository.getRoomById(id);
}

const addRoom = async (room) => {
    try {
        let existingCount = await roomRepository.getRoomsAtAddress(room.address);
        const {latitude, longitude} = await getCoordinatesFromAddress(room.address);
        if (latitude && longitude) {
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        } else {
            console.log('Failed to get coordinates.');
        }

        const {state, postcode} = await getPlaceDetails(room.address);

        if (existingCount === 0) {
            let roomToAdd = {...room, latitude, longitude, state, postcode};
            return await roomRepository.addRoom(roomToAdd);
        } else {
            let adjustedRoom = await adjustCoordinatesForProperty(room, latitude, longitude, existingCount);
            console.log("adjusted room is ", adjustedRoom);
            return await roomRepository.addRoom(adjustedRoom);
        }
    } catch (err) {
        throw err;
    }
}


module.exports = {
    getAllRooms,
    getRoomById,
    addRoom
};

