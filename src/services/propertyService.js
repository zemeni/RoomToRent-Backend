const propertyRepository = require('../repositories/propertyRepository');
const addressRepository = require('../repositories/addressRepository');
const Property = require("../models/Property");

const addProperty = async (propertyData) => {
    try {
        const {address, ...propertyDetails} = propertyData;
        const addressId = await addressRepository.addAddress(address);
        propertyDetails.addressId = addressId;
        return await propertyRepository.addProperty(propertyDetails);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addProperty,
};

