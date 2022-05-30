const jwt = require('jsonwebtoken');
const RedisClient = require('../modules/redis.module');
const { secret_key } = require('../config');

function sign(payload) {
    return jwt.sign(payload, secret_key, {
        algorithm: 'HS256',
        expiresIn: '1s',
    })
};

function verify(token) {
    let decoded = {}

    try {
        decoded = jwt.verify(token, secret_key);
        decoded.status = true
        return { ...decoded }
    } catch (err) {
        decoded.status = false
        decoded.message = err.message
        return { ...decoded }
    }
};

function decode(payload) {
    return jwt.decode(payload)
};

function refresh() {
    return jwt.sign({}, secret_key, {
        algorithm: 'HS256',
        expiresIn: '1s',
    })
}

async function refreshVerify(token, email) {
    try {
        const data = await RedisClient.get(token)

        if(email === data) {
            try {
                jwt.verify(token, secret_key)
                return true
            } catch (err) {
                return false
            }
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

module.exports = {
    sign, verify, refresh, refreshVerify, decode
}