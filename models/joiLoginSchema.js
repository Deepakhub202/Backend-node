const joi = require('joi');

const JoiLoginSchema = joi.object({
    login: joi.string().required().custom((value, helpers) => {
        const Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const Phone = /^\d{10}$/.test(value);

        if (!Email && !Phone) {
            return helpers.message('Enter valid email or number');
        }

        return value;
    }),

    password: joi.string().min(8).required()
});

module.exports = JoiLoginSchema;