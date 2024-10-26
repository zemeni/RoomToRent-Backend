const countryRepository = require('../repositories/countryRepository');

const getCountries = async () => {
    return await countryRepository.getAllCountriesWithStates();
}

module.exports = {
    getCountries
};
