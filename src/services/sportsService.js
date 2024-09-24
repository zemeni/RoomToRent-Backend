const sportsRepository = require('../repositories/sportsRepository');

const getSportsClubs = async (state) => {
    return await sportsRepository.getSportsClub(state);
}

module.exports = {
    getSportsClubs
};
