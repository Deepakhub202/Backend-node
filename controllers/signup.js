const user = require('../models/userSchema');
const jwtToken = require('../utils/jwtToken');

const signup = async (req, res, next) => {
    const { name, email, password, phone, countryCode } = req.body;
    try {
        const existingUser = await user.findOne({ $or: [{email},{phone}] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = await user.create({ name, email, password, phone, countryCode });
        newUser.password = undefined;

        const token = jwtToken({
            id: newUser._id,
            email: newUser.email
        })

        res.status(201).json({ message: 'User created successfully', token, user: newUser });

    } catch (error) {
        next(error);
    }
}

module.exports = signup;