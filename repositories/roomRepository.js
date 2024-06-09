// repositories/roomRepository.js
const pool = require('../config/db');

const getAllRooms = async () => {
    const result = await pool.query('SELECT * FROM rooms');
    return result.rows;
};

const getRoomById = async (roomId) => {
    const query = {
        text: 'SELECT * FROM rooms WHERE roomid = $1',
        values: [roomId]
    }
    const result = await pool.query(query);
    return result.rows[0];
};

module.exports = {
    getAllRooms,
    getRoomById,
};
