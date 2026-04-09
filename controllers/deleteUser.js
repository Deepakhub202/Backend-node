const user = require('../models/userSchema');
const mongoose = require('mongoose');

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const userData = await user.findByIdAndDelete(userId);

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        next(error);
    }
};

module.exports = deleteUser;
