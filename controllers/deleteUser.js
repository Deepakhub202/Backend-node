const user = require('../models/userSchema');
const mongoose = require('mongoose');

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const userData = await user.findByIdAndDelete(id);

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        next(error);
    }
};

module.exports = deleteUser;