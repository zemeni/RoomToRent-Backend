const pool = require("../config/db");

const getSportsClub = async (state) => {
    const result = await pool.query("SELECT * from sports where state=$1", [state]);
    return result.rows;
};

module.exports = {
    getSportsClub
};
