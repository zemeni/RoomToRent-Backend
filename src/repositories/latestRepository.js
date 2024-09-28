const pool = require("../config/db");

const getLatestInformation = async (state) => {
    const result = await pool.query("SELECT * from latest where state=$1  order by latestid desc", [state]);
    return result.rows;
};

module.exports = {
    getLatestInformation
};
