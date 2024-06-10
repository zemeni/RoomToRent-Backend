const db = require('../config/db');
// const Property = require('../models/propertyModel');

async function addProperty(propertyData) {
    const { ownerId, addressId, propertyTypeId, description, numberOfRooms, numberOfBathrooms, numberOfParking, price, pricePeriod, availableFrom, availableTo } = propertyData;

    const result = await db.query(
        `INSERT INTO properties 
        (OwnerId, AddressId, PropertyTypeId, Description, NumberOfRooms, NumberOfBathrooms, NumberOfParking, Price, PricePeriod, AvailableFrom, AvailableTo) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [ownerId, addressId, propertyTypeId, description, numberOfRooms, numberOfBathrooms, numberOfParking, price, pricePeriod, availableFrom, availableTo]
    );

    return result.rows[0];
}

module.exports = {
    addProperty,
};
