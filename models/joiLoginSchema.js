const joi = require('joi');

const JoiLoginSchema = joi.object({
    login: joi.string().required().custom((value, helpers) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isUsername = /^[a-zA-Z0-9_]{3,15}$/.test(value);

        if (!isEmail && !isUsername) {
            return helpers.message('Enter valid email or username');
        }

        return value;
    }),

    password: joi.string().min(8).required()
});

module.exports = JoiLoginSchema;