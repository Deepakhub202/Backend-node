const Joi = require('joi');

const JoiSignupSchema = Joi.object({
    name: Joi.string().min(3).max(30).trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().min(8).max(30).trim().required(),
    phone: Joi.string().pattern(/^\d{10}$/).trim().required(),
    countryCode: Joi.string().pattern(/^\+[1-9]\d{1,3}$/).trim().required()
}).options({allowUnknown: false});

module.exports = JoiSignupSchema;