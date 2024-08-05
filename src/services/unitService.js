const unitRepository = require('../repositories/unitRepository');
const {getCoordinatesFromAddress, adjustCoordinatesForProperty} = require("../util/geocodeConverter");

const getAllUnits = async () => {
    return await unitRepository.getAllMarkerUnits();
}

const getUnitById = async (id) => {
    return await unitRepository.getUnitById(id);
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

        if (existingCount === 0) {
            let unitToAdd = {...unit, latitude, longitude};
            return await unitRepository.addUnit(unitToAdd);
        } else {
            let adjustedUnit = await adjustCoordinatesForProperty(unit, latitude, longitude, existingCount);
            console.log("adjusted room is ", adjustedUnit);
            return await unitRepository.addUnit(adjustedUnit);
        }
    } catch (err) {
        throw err;
    }
}


module.exports = {
    getAllUnits,
    getUnitById,
    addUnit
};

