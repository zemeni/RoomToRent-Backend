const sportsService = require('../services/sportsService');

const getSportsClub= async (req, res) => {
    const state = req.query.state;
    console.log("getting sports club for state ", state);
    try {
        const properties = await sportsService.getSportsClubs(state);
        res.status(200).json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getSportsClub
}