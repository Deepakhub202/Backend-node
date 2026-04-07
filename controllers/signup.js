const user = require('../models/userSchema');
const jwtToken = require('../utils/jwtToken');
const generateOtp = require('../utils/generateOtp');
const verifyOtp = require('../utils/verifyOtp');
const { storeUserData, getStoredUserData, deleteStoredUserData } = require('../utils/redis');

const sendOtp = async (req, res, next) => {
    const { username, name, email, password, repassword } = req.body;
    
    try {
        const users = await user.findOne({username});
        if(users) return res.status(400).json({message:'username already exist in our database try something new'});
        
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password !== repassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const otp = generateOtp(email);
        

        await storeUserData(email, {
            username,
            name,
            email,
            password,
            otp
        });

        res.status(200).json({ 
            message: 'OTP sent successfully',
            otp: otp 
        });

    } catch (error) {
        next(error);
    }
};

const verifyOtpAndSignup = async (req, res, next) => {
    const { email, otp } = req.body;
    
    try {
        const tempData = await getStoredUserData(email);
        
        if (!tempData || tempData.email !== email) {
            return res.status(400).json({ message: 'No signup request found' });
        }

        const isOtpValid = verifyOtp(otp, tempData.otp);
        
        if (!isOtpValid) {
            await deleteStoredUserData(email);
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const newUser = await user.create({
            username: tempData.username,
            name: tempData.name,
            email: tempData.email,
            password: tempData.password
        });
        newUser.password = undefined;

        await deleteStoredUserData(email);

        const token = jwtToken({
            id: newUser._id,
            email: newUser.email,
            username: newUser.username
        });

        res.status(201).json({ 
            message: 'User created successfully', 
            token, 
            user: newUser 
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { sendOtp, verifyOtpAndSignup };