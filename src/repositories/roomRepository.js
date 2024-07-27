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

const addRoom = async (property) => {
  try {
    const {
      ownerid,
      description,
      numberofrooms,
      numberofbathroom,
      numberofparking,
      price,
      availablefrom,
      availableto,
    } = property;
    const query = {
      text: `INSERT INTO properties (ownerid, description, numberofrooms, numberofbathroom, numberofparking, price, availablefrom, availableto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      values: [
        ownerid,
        description,
        numberofrooms,
        numberofbathroom,
        numberofparking,
        price,
        availablefrom,
        availableto,
      ],
    };
    const result = await pool.query(query);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  addRoom,
};
