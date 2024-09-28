const pool = require("../config/db");

const getSocialEvents = async (state) => {
    const result = await pool.query("SELECT * from socials where state=$1 order by socialid asc", [state]);
    return result.rows;
};

module.exports = {
    getSocialEvents
};
