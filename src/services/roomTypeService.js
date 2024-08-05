const {addRoom} = require("./roomService");
const PropertyService = require("./propertyService");

class RoomTypeService extends PropertyService {
    async add(room) {
        return await addRoom(room);
    }
}

module.exports = RoomTypeService;