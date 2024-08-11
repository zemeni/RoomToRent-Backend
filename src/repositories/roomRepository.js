// repositories/roomRepository.js
const pool = require("../config/db");

const getAllRooms = async () => {
  const result = await pool.query("SELECT * FROM rooms");
  return result.rows;
};

const getAllMarkerRooms = async (state) => {
    console.log("querying for state", state);
    const result = await pool.query("SELECT id, price, latitude, longitude from rooms where state=$1", [state]);
    return result.rows;
}

const getRoomById = async (roomId) => {
  const query = {
    text: "SELECT * FROM rooms WHERE id = $1",
    values: [roomId],
  };
  const result = await pool.query(query);
  return result.rows[0];
};

const getRoomsAtAddress = async (address) => {
    try {
        const query = {
            text: 'SELECT COUNT(*) FROM rooms WHERE address = $1',
            values: [address]
        };
        const result = await pool.query(query);
        const count = parseInt(result.rows[0].count, 10);
        return count;
    } catch (err) {
        throw err;
    }
};

const addRoom = async (room) => {
    console.log("inserting this room ", room);
    try {
        const { gender, address, price, including, roomType, furnished, description, bathrooms, parkings, startDate, endDate, phone1, phone2, images, userId, id , latitude, longitude, state, postcode} = room;
        const query = {
            text: `INSERT INTO rooms (gender, address, price, including, roomtype, furnished, description, bathrooms, parkings, startdate, enddate, phone1, phone2, images, userid, roomnumber, latitude, longitude, state, postcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *`,
            values: [
                gender,
                address,
                price,
                including,
                roomType,
                furnished,
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
        return  {success: true, message:"room added successfully"};
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getAllRooms,
    getRoomById,
    addRoom,
    getRoomsAtAddress,
    getAllMarkerRooms
};
