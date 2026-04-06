const express = require("express");
const router = express.Router();

const signup = require('../controllers/signup');
const login = require('../controllers/login');
const searchUsers = require('../controllers/searchUsers');
const validate = require('../middlewares/validate');
const jwtVerify = require('../middlewares/jwtVerify');
const JoiLoginSchema = require('../models/joiLoginSchema');
const JoiSignupSchema = require('../models/joiSignupSchema');
const getUser = require('../controllers/getUser');

router.post('/signup', validate(JoiSignupSchema), signup);
router.post('/login', validate(JoiLoginSchema), login);

router.get('/users/search', searchUsers);
router.get('/users/:id',jwtVerify, getUser)

module.exports = router;