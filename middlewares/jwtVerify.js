const jwt = require('jsonwebtoken');

const jwtVerify = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.key);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = jwtVerify;