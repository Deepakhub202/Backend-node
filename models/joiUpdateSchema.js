const Joi = require('joi');

const JoiUpdateSchema = Joi.object({
    username: Joi.string().min(3).max(15).trim(),
    name: Joi.string().min(3).max(30).trim(),
}).options({allowUnknown: false});
module.exports = JoiUpdateSchema;
