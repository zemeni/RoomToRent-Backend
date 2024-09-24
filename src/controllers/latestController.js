const latestService = require('../services/latestService');

const getLatestInformation= async (req, res) => {
    const state = req.query.state;
    console.log("getting latest information for state ", state);
    try {
        const properties = await latestService.getLatestInformation(state);
        res.status(200).json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getLatestInformation
}