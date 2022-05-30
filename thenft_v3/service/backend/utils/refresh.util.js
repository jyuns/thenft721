const { sign, verify, refreshVerify } = require('./token.util');
const jwt = require('jsonwebtoken');

async function refresh(req, res, next) {
    if(req.headers.authorization && req.headers.refresh) {
        const accessToken = req.headers.authorization.split('Bearer ')[1];
        const refreshToken = req.headers.refresh;

        let accessResult = verify(accessToken);
        let decoded = jwt.decode(accessResult);

        if(decoded === null) {
            return res.status(401).send({
                status: false,
                message: 'No Authorized!'
            })
        }

        let refreshResult = refreshVerify(refreshToken, decoded.email);

        if(accessResult.status === false && accessResult.message === 'jwt expired') {
            if(refreshResult === false) {
                res.status(401).send({
                    status: false,
                    message: 'No Authorized!'
                })
            } else {
                //! user 값 bind 필요
                let newAccessToken = sign(user);

                res.send({
                    status: true,
                    data: {
                        accessToken: newAccessToken,
                        refreshToken
                    }
                })
            }
        } else {
            res.status(401).send({
                status: false,
                message: 'Acess token is not expired!'
            })
        }
    } else {
        res.status(401).send({
            status: false,
            message: 'Access token and refresh token are need for refresh!',
        })
    }
}

module.exports = refresh;