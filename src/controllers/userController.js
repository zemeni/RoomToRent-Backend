const userService = require('../services/userService');

const signup = async (req, res) => {
    console.log("signup request in backend is ", req.body);
    try {
        const user = await userService.signUp(req.body);
        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const login = async (req, res) => {
    console.log("login request ", req.body);
    try {
        const user = await userService.login(req.body);
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const profile = async (req, res) => {
    console.log("data received in backend ", req.body);
    try {
        const user = await userService.profile(req.body);
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    signup,
    login,
    profile
};
