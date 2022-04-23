const { verify } = require('./token.util');

function authJWT(req, res, next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1];
        const result = verify(token);

        if(result.status) {
            req.email = result.email;
            req.nickname = result.nickname;
            req.role = result.role;

            next();
        } else {
            res.status(409).json({
                status: false,
                message: result.message,
            })
        }
    }
}

module.exports = { authJWT }