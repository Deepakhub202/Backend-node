const express = require("express");
const router = express.Router();

const signup = require('../controllers/signup');
const login = require('../controllers/login');
const validate = require('../middlewares/validate');
const jwtVerify = require('../middlewares/jwtVerify');
const JoiLoginSchema = require('../models/joiLoginSchema');
const JoiSignupSchema = require('../models/joiSignupSchema');

router.post('/signup', validate(JoiSignupSchema), signup);
router.post('/login', validate(JoiLoginSchema), login);

module.exports = router;