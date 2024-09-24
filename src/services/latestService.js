const latestRepository = require('../repositories/latestRepository');

const getLatestInformation = async (state) => {
    return await latestRepository.getLatestInformation(state);
}

module.exports = {
    getLatestInformation
};
