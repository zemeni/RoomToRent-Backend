const socialService = require('../services/socialService');

const getSocialEvents= async (req, res) => {
    const state = req.query.state;
    console.log("getting social events ", state);
    try {
        const properties = await socialService.getSocialEvents(state);
        res.status(200).json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getSocialEvents
}