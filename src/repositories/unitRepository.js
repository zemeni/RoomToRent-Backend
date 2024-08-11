// repositories/roomRepository.js
const pool = require("../config/db");

const getAllUnits = async () => {
  const result = await pool.query("SELECT * FROM units");
  return result.rows;
};

const getAllMarkerUnits = async (state) => {
    const result = await pool.query("SELECT id, price, latitude, longitude, 'unit' as type from units where state=$1", [state]);
    return result.rows;
}

const getUnitById = async (roomId) => {
  const query = {
    text: "SELECT * FROM units WHERE id = $1",
    values: [roomId],
  };
  const result = await pool.query(query);
  return result.rows[0];
};

const getUnitsAtAddress = async (address) => {
    try {
        const query = {
            text: 'SELECT COUNT(*) FROM units WHERE address = $1',
            values: [address]
        };
        const result = await pool.query(query);
        const count = parseInt(result.rows[0].count, 10);
        return count;
    } catch (err) {
        throw err;
    }
};

const addUnit = async (unit) => {
    try {
        const {address, price, bondPrice, rooms, description, bathrooms, parkings, startDate, endDate, phone1, phone2, images, userId, id , latitude, longitude, state, postcode} = unit;
        const query = {
            text: `INSERT INTO units (address, price, bondprice, rooms, description, bathrooms, parkings, startdate, enddate, phone1, phone2, images, userid, unitnumber, latitude, longitude, state, postcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`,
            values: [
                address,
                price,
                bondPrice,
                rooms,
                description,
                bathrooms,
                parkings,
                startDate,
                endDate,
                phone1,
                phone2,
                images,
                userId,
                id,
                latitude,
                longitude,
                state,
                postcode
            ]
        };
        const result = await pool.query(query);
        // console.log("result is ", result);
        // return result.rows[0];
        return  {success: true, message:"unit added successfully"};
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getAllUnits,
    getUnitById,
    addUnit,
    getUnitsAtAddress,
    getAllMarkerUnits
};
