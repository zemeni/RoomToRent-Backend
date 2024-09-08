const {getAllRooms, getRoomById} = require("./roomService");
const {getAllUnits, getUnitById} = require("./unitService");
const {getUserByEmail} = require("../repositories/userRepository");
const {getRoomByUserId} = require("../repositories/roomRepository");
const {getUnitByUserId} = require("../repositories/unitRepository");

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
        const typeHandlers = {
            room: getRoomById,
            unit: getUnitById
        };

        const propertyHandler = typeHandlers[type];
        if (!propertyHandler) {
            throw new Error('Property type not found');
        }

        return await propertyHandler(id);
    }

    async getPropertyByUsername(username) {
        try {
            const {userid} = await getUserByEmail(username);
            const rooms = await getRoomByUserId(userid);
            const units = await getUnitByUserId(userid);

            console.log("rooms is ", rooms);
            console.log("unit is ", units);
            return [...rooms, ...units];
        }catch (err) {
            console.error('Error fetching properties:', err);
            throw new Error('Server Error');
        }
    }

}

module.exports = PropertyService;