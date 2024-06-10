const userService = require('../services/userService');

const signup = async (req, res) => {
    try {
        const user = await userService.signUp(req.body);
        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const login = async (req, res) => {
    try {
        const user = await userService.login(req.body);
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    signup,
    login,
};
