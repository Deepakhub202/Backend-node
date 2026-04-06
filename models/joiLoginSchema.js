const joi = require('joi');

const JoiLoginSchema = joi.object({
    login: joi.string().required().custom((value, helpers) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isPhone = /^\d{10}$/.test(value);
        const isUsername = /^[a-zA-Z0-9_]{3,15}$/.test(value);

        if (!isEmail && !isPhone && !isUsername) {
            return helpers.message('Enter valid email, phone, or username');
        }

        return value;
    }),

    password: joi.string().min(8).required()
});

module.exports = JoiLoginSchema;