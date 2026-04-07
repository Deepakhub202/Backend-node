const user = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwtToken = require('../utils/jwtToken');

const login = async (req,res,next) => {
    const {login,password} = req.body

    try {
        const existingUser = await user.findOne({ $or: [{ email: login }, {username: login}] }).select('+password');

        if (!existingUser) {
            return res.status(400).json({ message: "user not found" });
        }

        const compare = await bcrypt.compare(password, existingUser.password);

        if (!compare) {
            return res.status(400).json({ message: "incorrect password" });
        }
        
        const token = jwtToken({
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username
        });

        res.status(200).json({message: "login successful",token});

    } catch (error) {
        next(error);
    }
}

module.exports = login;