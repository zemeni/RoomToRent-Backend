// repositories/roomRepository.js
const pool = require("../config/db");

const getAllRooms = async () => {
  const result = await pool.query("SELECT * FROM rooms");
  return result.rows;
};

const getAllMarkerRooms = async (state) => {
    console.log("querying for state", state);
    const result = await pool.query("SELECT id, price, latitude, longitude, address, description, 'room' as type from rooms where state=$1", [state]);
    return result.rows;
}

const getRoomById = async (roomId) => {
  const query = {
    text: "SELECT *, 'room' as type FROM rooms WHERE id = $1",
    values: [roomId],
  };
  const result = await pool.query(query);
  return result.rows[0];
};

const deleteRoomById = async (id) => {
    console.log("deleting room id", id);
    const query = {
        text: 'DELETE FROM rooms WHERE id = $1 RETURNING *',
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

const updateRoomById = async (id, room) => {
    console.log("updating this room >> ", room);
    const query = {
        text: `
      UPDATE rooms 
      SET 
        gender = $1, 
        price = $2, 
        "including" = $3,   -- Escaped the reserved keyword "including"
        roomtype = $4, 
        furnished = $5, 
        description = $6, 
        bathrooms = $7, 
        parkings = $8, 
        startdate = $9, 
        enddate = $10, 
        phone1 = $11, 
        phone2 = $12
      WHERE id = $13
      RETURNING *;
    `,
        values: [
            room.gender,
            room.price,
            room.including,      // Assuming 'including' is a property in roomDetails
            room.roomtype,
            room.furnished,
            room.description,
            room.bathrooms,
            room.parkings,
            room.startdate,
            room.enddate,        // Make sure the field names match your database
            room.phone1,
            room.phone2,
            id
        ],
    };

    const result = await pool.query(query);
    return result.rows[0];  // Return the updated room details
};

const getRoomByUserId = async (roomId) => {
    const query = {
        text: "SELECT *, 'room' as type FROM rooms WHERE userid = $1",
        values: [roomId],
    };
    const result = await pool.query(query);
    return result.rows;
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
        const { gender, address, price, including, roomType, furnished, description, bathrooms, parkings, startDate, endDate, phone1, phone2, userId, id , latitude, longitude, state, postcode} = room;
        const query = {
            text: `INSERT INTO rooms (gender, address, price, including, roomtype, furnished, description, bathrooms, parkings, startdate, enddate, phone1, phone2, userid, roomnumber, latitude, longitude, state, postcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`,
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
    getAllMarkerRooms,
    getRoomByUserId,
    updateRoomById,
    deleteRoomById
};
