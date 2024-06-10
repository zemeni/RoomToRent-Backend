const addAddress = async (addressData) => {
    const { fullAddress, suburb, state, postcode, country } = addressData;

    const result = await db.query(
        `INSERT INTO address 
        (FullAddress, Suburb, State, Postcode, Country) 
        VALUES ($1, $2, $3, $4, $5) RETURNING AddressId`,
        [fullAddress, suburb, state, postcode, country]
    );

    return result.rows[0].addressId;
};

module.exports = {
    addAddress,
};
