const joi = require('joi');

const validateEmail = (email) => {
    return joi.string().email().required().messages({
        'string.email': 'Invalid email',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    });
}

const validatePassword = (password) => {
    return joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    });
}

const validateName = (name) => {
    return joi.string().min(3).required().messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    });
}

const validatePhone = (phone) => {
    return joi.string().phone().pattern(/^[0-9]{10}$/).required().messages({
        'string.phone': 'Invalid phone number',
        'string.empty': 'Phone number is required',
        'any.required': 'Phone number is required'
    });
}

const validateCountryCode = (countryCode) => {
    return joi
        .string()
        .length(2)
        .pattern(/^[0-9]{1,3}$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid country code',
            'string.length': 'Country code must be exactly 2 letters',
            'string.empty': 'Country code is required',
            'any.required': 'Country code is required'
        });
};

module.exports = { validateEmail, validatePassword, validateName, validateCountryCode };
