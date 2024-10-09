const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ error: '토큰이 필요합니다.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
        if (err) return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
        req.admin = admin;
        next();
    });
};

module.exports = authenticateToken;
