const {getAllRooms, getRoomById} = require("./roomService");
const {getAllUnits, getUnitById} = require("./unitService");

class PropertyService {
    async add(property) {
        throw new Error('Method not implemented');
    }

    async getProperties(state) {
        const rooms = await getAllRooms(state);
        const units = await getAllUnits(state);

        return [...rooms, ...units];
    }

    async getPropertyByIdAndType(id, type) {
        let property;
        if (type === 'room') {
            property = await getRoomById(id);
        } else if (type === 'unit') {
            property = await getUnitById(id);
        } else {
            throw new Error('Property type not found');
        }
        return property
    }
}

module.exports = PropertyService;