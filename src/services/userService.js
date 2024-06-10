const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

const SECRET_KEY = process.env.JWT_SECRET || 'abcd1234'; // Use a strong secret key and store it securely

const signUp = async (userData) => {
    const { firstname, lastname, email, password, phone } = userData;

    // Check if user already exists
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await userRepository.createUser({ firstname, lastname, email, password: hashedPassword, phone });
    return newUser;
};

const login = async ({email, password}) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.userid, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    const userProfile = await userRepository.getUserProfile(user.email);
    return { token, userProfile };
};

const profile = async ({email}) => {
    const user = await userRepository.getUserProfile(email);
    if (!user) {
        throw new Error(`User doesn't exist`);
    }
    return user;
};

module.exports = {
    signUp,
    login,
    profile
};
