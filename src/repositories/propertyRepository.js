const pool = require('../config/db');

const addProperty = async propertyData => {
    const {
        ownerid,
        propertytypeid,
        addressid,
        description,
        numberofrooms,
        numberofbathroom,
        numberofparking,
        price,
        priceperiod,
        availablefrom,
        availableto
    } = propertyData;

    try {
        const query = {
            text: `INSERT INTO properties (ownerid, propertytypeid, addressid, description, numberofrooms,
                                           numberofbathroom,
                                           numberofparking, price, priceperiod, availablefrom, availableto)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            values: [ownerid, propertytypeid, addressid, description, numberofrooms, numberofbathroom, numberofparking, price, priceperiod, availablefrom, availableto]
        };

        await pool.query(query);
        return {success: true, message: "property added successfully"};
    } catch (err) {
        return {success: false, message: err.message};
    }
};


module.exports = {
    addProperty,
};
