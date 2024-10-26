const pool = require("../config/db");

const getAllCountriesWithStates = async () => {
    const result = await pool.query(
        `SELECT 
                countries.country_key AS country_key,
                countries.label AS country_label,
                states.state_key AS state_key,
                states.label AS state_label,
                states.latitude,
                states.longitude
             FROM states
             JOIN countries ON states.country_key = countries.country_key
              `);
    return result.rows;
};

module.exports = {
    getAllCountriesWithStates
};
