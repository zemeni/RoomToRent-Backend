const unitRepository = require('../repositories/unitRepository');
const {getCoordinatesFromAddress, adjustCoordinatesForProperty, getPlaceDetails} = require("../util/geocodeConverter");
const roomRepository = require("../repositories/roomRepository");

const getAllUnits = async (unit) => {
    return await unitRepository.getAllMarkerUnits(unit);
}

const getUnitById = async (id) => {
    return await  unitRepository.getUnitById(id);
}

const getUnitByUserId = async (id) => {
    return await unitRepository.getUnitByUserId(id);
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

        const {state, postcode} = await getPlaceDetails(unit.address);

        if (existingCount === 0) {
            let unitToAdd = {...unit, latitude, longitude, state, postcode};
            return await unitRepository.addUnit(unitToAdd);
        } else {
            let adjustedUnit = await adjustCoordinatesForProperty(unit, latitude, longitude, existingCount);
            console.log("adjusted room is ", adjustedUnit);
            let unitToAdd = {...adjustedUnit, state, postcode};
            return await unitRepository.addUnit(unitToAdd);
        }
    } catch (err) {
        throw err;
    }
}

const updateUnitById = async (id, room) => {
    return await unitRepository.updateUnitById(id,room);
}


module.exports = {
    getAllUnits,
    getUnitById,
    getUnitByUserId,
    addUnit,
    updateUnitById
};

