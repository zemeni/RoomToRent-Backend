const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'abcd1234';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ','');
    console.log("token received is ", token);
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = authMiddleware;
