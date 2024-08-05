const RoomTypeService =  require("./roomTypeService");
const UnitTypeService =  require("./unitTypeService");

class PropertyServiceFactory {
    static getService(type) {
        switch (type) {
            case 'room':
                return new RoomTypeService();
            case 'unit':
                return new UnitTypeService();
            default:
                throw new Error('Invalid room type');
        }
    }
}

module.exports = PropertyServiceFactory;