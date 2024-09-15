const {addRoom} = require("./roomService");
const PropertyService = require("./propertyService");
const {updateRoomById, deleteRoomById} = require("../repositories/roomRepository");

class RoomTypeService extends PropertyService {
    async add(room) {
        return await addRoom(room);
    }
    async update(id, room) {
        return await updateRoomById(id, room);
    }
    async delete(id) {
        return await deleteRoomById(id);
    }
}

module.exports = RoomTypeService;