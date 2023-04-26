const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    try {
        const token = req.header('x-auth-token');
        if (!token) return res
            .status(401)
            .json({ msg: "Access Denied" });

        const verify = jwt.verify(token, 'passwordKey');
        if (!verify) return res
            .status(401)
            .json({ msg: 'Token Verification failed, Access Denied' });
        req.user = verify.id;
        req.token = token;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = auth;