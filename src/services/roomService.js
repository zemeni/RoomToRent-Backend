// services/roomService.js
const roomRepository = require('../repositories/roomRepository');
const unitRepository = require('../repositories/unitRepository');
const Property = require('../models/Property');
const getCoordinatesFromAddress = require("../util/geocodeConverter");

const getAllRooms = async () => {
    return await roomRepository.getAllMarkerRooms();
}

const getRoomById = async (id) => {
    return await roomRepository.getRoomById(id);
}

/*const addRoom  = async (rooms) => {
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
}*/

const addRoom = async (rooms) => {
    const results = [];
    for (const room of rooms) {
        if (room.type === 'room') {
            let room = await addRoom1(room)
            results.push(room);
        } else if (room.type === 'unit') {
            console.log("found unit type");
            let unit = await addUnit(room);
            results.push(unit);
        }
    }
    return results;
}

const addRoom1 = async (room) => {
    try {
        let existingCount = await roomRepository.getRoomsAtAddress(room.address);
        const {latitude, longitude} = await getCoordinatesFromAddress(room.address);
        if (latitude && longitude) {
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        } else {
            console.log('Failed to get coordinates.');
        }

        if(existingCount === 0) {
            let roomToAdd = {...room, latitude, longitude};
            return await roomRepository.addRoom(roomToAdd);
        }else {
            let adjustedRoom = await adjustCoordinatesForProperty(room, latitude, longitude, existingCount);
            console.log("adjusted room is ", adjustedRoom);
            return await roomRepository.addRoom(adjustedRoom);
        }
    } catch (err) {
        throw err;
    }
}

const addUnit = async (unit) => {
    try {
        let existingCount = await unitRepository.getUnitsAtAddress(unit.address);
        const {latitude, longitude} = await getCoordinatesFromAddress(unit.address);
        if (latitude && longitude) {
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        } else {
            console.log('Failed to get coordinates.');
        }

        if(existingCount === 0) {
            let unitToAdd = {...unit, latitude, longitude};
            return await unitRepository.addUnit(unitToAdd);
        }else {
            let adjustedUnit = await adjustCoordinatesForProperty(unit, latitude, longitude, existingCount);
            console.log("adjusted room is ", adjustedUnit);
            return await unitRepository.addUnit(adjustedUnit);
        }
    } catch (err) {
        throw err;
    }
}

const adjustCoordinatesForProperty = async (room, latitude, longitude, existingCount) => {
    console.log("before adjustment ", latitude, longitude, existingCount);
    const baseAdjustment = 0.0001; // Increased base adjustment value
    const spreadFactor = 0.00005 * existingCount; // Spread markers based on count

    const angle = (360 / (existingCount + 1)) * existingCount;
    const radian = angle * (Math.PI / 180);

    latitude += (baseAdjustment + spreadFactor) * Math.cos(radian);
    longitude += (baseAdjustment + spreadFactor) * Math.sin(radian);

    room.latitude = latitude;
    room.longitude = longitude;

    console.log("after adjustment ", latitude, longitude);
    return room;
};


module.exports = {
    getAllRooms,
    getRoomById,
    addRoom
};

