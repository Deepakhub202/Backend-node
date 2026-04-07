const Joi = require('joi');

const JoiSendOtpSchema = Joi.object({
    username: Joi.string().min(3).max(15).trim().required(),
    name: Joi.string().min(3).max(30).trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(8).max(30).trim().required(),
    repassword: Joi.string().min(8).max(30).trim().required()
}).options({allowUnknown: false});

module.exports = JoiSendOtpSchema;

