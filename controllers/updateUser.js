const user = require('../models/userSchema');

const updateUser = async (req, res, next) => {
    try {
        const { username, name } = req.body;

        if (!username && !name) {
            return res.status(400).json({ message: "Enter username or name" });
        }

        const userId = req.user.id;

        const userdata = await user.findById(userId);
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        if (
            (username && username === userdata.username) ||
            (name && name === userdata.name)
        ) {
            return res.status(400).json({ message: "New data must be different" });
        }

        // update fields
        if (username) userdata.username = username;
        if (name) userdata.name = name;

        await userdata.save();

        res.status(200).json({
            message: "User updated successfully",
            userdata
        });

    } catch (err) {
        next(err);
    }
};

module.exports = updateUser;
