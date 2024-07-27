// repositories/roomRepository.js
const pool = require("../config/db");

const getAllRooms = async () => {
  const result = await pool.query("SELECT * FROM rooms");
  return result.rows;
};

const getRoomById = async (roomId) => {
  const query = {
    text: "SELECT * FROM rooms WHERE roomid = $1",
    values: [roomId],
  };
  const result = await pool.query(query);
  return result.rows[0];
};

const addRoom = async (room) => {
    console.log()
    try {
        const { address, price, including, roomType, furnished, description, bathrooms, parkings, startDate, images, userId, id } = room;
        const query = {
            text: `INSERT INTO rooms (address, price, including, roomtype, furnished, description, bathrooms, parkings, startdate, images, userid, roomnumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            values: [
                address,
                price,
                including,
                roomType,
                furnished,
                description,
                bathrooms,
                parkings,
                startDate,
                images,
                userId,
                id
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
    addRoom
};
