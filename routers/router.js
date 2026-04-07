const express = require("express");
const router = express.Router();

const signup = require('../controllers/signup');
const { sendOtp, verifyOtpAndSignup } = signup;
const login = require('../controllers/login');
const searchUsers = require('../controllers/searchUsers');
const validate = require('../middlewares/validate');
const jwtVerify = require('../middlewares/jwtVerify');
const JoiLoginSchema = require('../models/joiLoginSchema');
const JoiSignupSchema = require('../models/joiSignupSchema');
const getUser = require('../controllers/getUser');
const JoiUpdateSchema = require('../models/joiUpdateSchema');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');
const JoiSendOtpSchema = require('../models/joiOtpSchema');

router.post('/signup', validate(JoiSignupSchema), signup);
router.post('/login', validate(JoiLoginSchema), login);

router.post('/signup/send-otp', validate(JoiSendOtpSchema), sendOtp);
router.post('/signup/verify-otp', verifyOtpAndSignup);

router.get('/users/search', searchUsers);
router.get('/users/:id',jwtVerify, getUser);
router.put('/users/:id', jwtVerify, validate(JoiUpdateSchema), updateUser);
router.delete('/users/delete/:id',jwtVerify, deleteUser);

module.exports = router;