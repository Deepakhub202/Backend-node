const express = require("express");
const Joi = require('joi');
const router = express.Router();

const { sendOtp, verifyOtpAndSignup } = require('../controllers/signup');
const login = require('../controllers/login');
const searchUsers = require('../controllers/searchUsers');
const validate = require('../middlewares/validate');
const jwtVerify = require('../middlewares/jwtVerify');
const JoiLoginSchema = require('../models/joiLoginSchema');
const getUser = require('../controllers/getUser');
const JoiUpdateSchema = require('../models/joiUpdateSchema');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');
const JoiSignupSchema = require('../models/joiSignupSchema');

const JoiVerifyOtpSchema = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    otp: Joi.string().pattern(/^\d{6}$/).required()
}).options({ allowUnknown: false });


router.post('/login', validate(JoiLoginSchema), login);

router.post('/signup', validate(JoiSignupSchema), sendOtp);
router.post('/signup/verify-otp', verifyOtpAndSignup);

router.get('/users/search', jwtVerify, searchUsers);
router.get('/user/find', jwtVerify, getUser);
router.put('/user/update', jwtVerify, validate(JoiUpdateSchema), updateUser);
router.delete('/user/delete', jwtVerify, deleteUser);

module.exports = router;
