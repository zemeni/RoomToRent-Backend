// services/userService.js
const userRepository = require('../repositories/userRepository');

const signup = async (userData) => {
    try {
        const user = await userRepository.createUser(userData);
        return user;
    } catch (err) {
        throw err;
    }
};

const login = async (userData) => {
    try {
        const user = await userRepository.getUserByEmailAndPassword(userData.email, userData.password);
        return user;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    signup,
    login,
};
