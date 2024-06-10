const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

const SECRET_KEY = process.env.JWT_SECRET || 'abcd1234'; // Use a strong secret key and store it securely

const signUp = async (userData) => {
    const { firstName, lastName, email, password, phone } = userData;

    // Check if user already exists
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await userRepository.createUser({ firstName, lastName, email, password: hashedPassword, phone });
    return newUser;
};

const login = async ({email, password}) => {
    console.log("email, password", email, password);
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    console.log("user is ", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.userid, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return { token };
};

module.exports = {
    signUp,
    login,
};
