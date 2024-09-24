const socialRepository = require('../repositories/socialRepository');

const getSocialEvents = async (state) => {
    return await socialRepository.getSocialEvents(state);
}

module.exports = {
    getSocialEvents
};
