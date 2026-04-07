const user = require('../models/userSchema');
const mongoose = require('mongoose');

const searchUsers = async (req, res, next) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const userData = await user.find({
            username: { $regex: username, $options: 'i' }
        })
        .select('username')   
        .limit(10);          

        res.status(200).json({ users: userData });

    } catch (error) {
        next(error);
    }
};

module.exports = searchUsers;