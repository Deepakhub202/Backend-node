const jwt = require('jsonwebtoken');

const jwtVerify = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = header.split(' ')[1];
    if (!token) return res.status(400).json({message: 'invalid token'})
    try {
        const decoded = jwt.verify(token, process.env.key);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = jwtVerify;