const unitService = require('../services/unitService');

const getAllUnits = async (req, res) => {
    const {state} = req.query;
    try {
        const units = await unitService.getAllUnits(state);
        res.status(200).json(units);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const getUnitById = async (req, res) => {
    console.log("getting room by id ", req.params.id);
    try {
        const room = await unitService.getUnitById(req.params.id);
        if (!room) {
            return res.status(404).send('Room not found');
        }
        res.status(200).json(room);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const addUnit = async (req, res) => {
    try {
        const userId = req.user.userId;
        const unitsWithUserId = req.body.map(unit => ({...unit, userId}))
        const result = await  unitService.addUnit(unitsWithUserId);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getAllUnits,
    getUnitById,
    addUnit
};