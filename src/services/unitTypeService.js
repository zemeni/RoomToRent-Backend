const {addUnit, updateUnitById, de} = require("./unitService");
const PropertyService = require("./propertyService");
const {deleteUnitById} = require("../repositories/unitRepository");


class UnitTypeService extends PropertyService {
    async add(unit) {
        return await addUnit(unit);
    }
    async update(id, unit) {
        return await updateUnitById(id, unit);
    }
    async delete(id) {
        return await deleteUnitById(id)
    }
}

module.exports = UnitTypeService;