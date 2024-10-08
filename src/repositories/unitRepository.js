// repositories/roomRepository.js
const pool = require("../config/db");

const getAllUnits = async () => {
  const result = await pool.query("SELECT * FROM units");
  return result.rows;
};

const getAllMarkerUnits = async (state) => {
    const result = await pool.query("SELECT id, price, latitude, longitude, address, description, 'unit' as type from units where state=$1", [state]);
    return result.rows;
}

const getUnitById = async (unitId) => {
  const query = {
    text: "SELECT * FROM units WHERE id = $1",
    values: [unitId],
  };
  const result = await pool.query(query);
  return result.rows[0];
};

const getUnitByUserId = async (roomId) => {
    const query = {
        text: "SELECT *, 'unit' as type FROM units WHERE userid = $1",
        values: [roomId],
    };
    const result = await pool.query(query);
    return result.rows;
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
        const {address, price, bondPrice, rooms, description, bathrooms, parkings, startDate, endDate, phone1, phone2, userId, id , latitude, longitude, state, postcode} = unit;
        const query = {
            text: `INSERT INTO units (address, price, bondprice, rooms, description, bathrooms, parkings, startdate, enddate, phone1, phone2, userid, unitnumber, latitude, longitude, state, postcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
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

const deleteUnitById = async (id) => {
    const query = {
        text: 'DELETE FROM units WHERE id = $1 RETURNING *',
        values: [id],
    };

    try {
        const result = await pool.query(query);

        if (result.rowCount === 0) {
            throw new Error(`Room with id ${id} not found`);
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error deleting room:', error.message);
        throw error;
    }
};

const updateUnitById = async (id, unit) => {
    console.log("updating this unit >> ", unit);
    const query = {
        text: `
      UPDATE units 
      SET 
        rooms = $1, 
        price = $2, 
        bondprice = $3, 
        description = $4, 
        bathrooms = $5, 
        parkings = $6, 
        startdate = $7, 
        enddate = $8, 
        phone1 = $9, 
        phone2 = $10
      WHERE id = $11
      RETURNING *;
    `,
        values: [
            unit.rooms,
            unit.price,
            unit.bondprice,
            unit.description,
            unit.bathrooms,
            unit.parkings,
            unit.startdate,
            unit.enddate,
            unit.phone1,
            unit.phone2,
            id
        ],
    };

    const result = await pool.query(query);
    return result.rows[0];  // Return the updated room details
};

module.exports = {
    getAllUnits,
    getUnitById,
    addUnit,
    getUnitsAtAddress,
    getAllMarkerUnits,
    getUnitByUserId,
    updateUnitById,
    deleteUnitById
};
