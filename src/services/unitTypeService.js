const {addUnit} = require("./unitService");
const PropertyService = require("./propertyService");

class UnitTypeService extends PropertyService {
    async add(unit) {
        return await addUnit(unit);
    }
}

module.exports = UnitTypeService;