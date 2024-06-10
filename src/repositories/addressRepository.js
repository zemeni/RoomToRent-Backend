const axios = require('axios');
const pool = require("../config/db");


const addAddress = async  (address) => {
    try {
        const parsedAddress = await geocodeAddress(address);
        return await insertAddress(address, parsedAddress);
    }catch (error) {
        return {success: false, message: err.message};
    }
};

const insertAddress = async (fullAddress, parsedAddress) => {
    try {
        const {city: suburb, state, country} = parsedAddress;
        const postcode = parseInt(parsedAddress.postcode);
        const query = {
            text: `INSERT INTO address (fulladdress, suburb, state, postcode, country)
                   VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            values: [fullAddress, suburb, state, postcode, country]
        };
        const result = await pool.query(query);
        return result.rows[0].addressid;
    } catch (err) {
        return {success: false, message: err.message};
    }
}


const geocodeAddress = async address => {
    console.log("inside geocodeAddress ", address);
    const apiKey = 'AIzaSyDt1cbLbJKdOoDdYFR-YTeJjBObbekgwjE';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const result = response.data.results[0];

        const parsedAddress = {
            streetNumber: result.address_components.find(c => c.types.includes('street_number'))?.long_name,
            streetName: result.address_components.find(c => c.types.includes('route'))?.long_name,
            city: result.address_components.find(c => c.types.includes('locality'))?.long_name,
            state: result.address_components.find(c => c.types.includes('administrative_area_level_1'))?.short_name,
            postcode: result.address_components.find(c => c.types.includes('postal_code'))?.long_name,
            country: result.address_components.find(c => c.types.includes('country'))?.long_name,
        };

        return parsedAddress;
    } catch (error) {
        console.error('Error geocoding address:', error);
        throw new Error('Error geocoding address');
    }
};

// Example usage
// const address = "112/12 Blaxcell St, Granville NSW 2142, Australia";
// geocodeAddress(address).then(parsedAddress => console.log(parsedAddress));


module.exports = {
    addAddress,
    geocodeAddress
};
