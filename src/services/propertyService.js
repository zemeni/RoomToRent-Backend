const propertyRepository = require('../repositories/propertyRepository');
const addressRepository = require('../repositories/addressRepository');

const addProperty = async (propertyData) => {
    try {
        const {address, propertyDetails} = propertyData;
        const addressId = await addressRepository.addAddress(address);
        propertyDetails.addressid = addressId;
        return await propertyRepository.addProperty(propertyDetails);
    } catch (err) {
        return {success: false, message: err.message};
    }
}

module.exports = {
    addProperty,
};

