const jwt = require('jsonwebtoken');

const jwtToken = (payload) => {
    return jwt.sign(payload, process.env.key, { expiresIn: '90d' });
}

module.exports =  jwtToken;
