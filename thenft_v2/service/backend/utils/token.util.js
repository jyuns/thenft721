const jwt = require('jsonwebtoken');
const RedisClient = require('../modules/redis.module');
const { secretKey } = require('../config');

function sign(payload) {
    return jwt.sign(payload, secretKey, {
        algorithm: 'HS256',
        expiresIn: '1d',
    })
}

function verify(token) {
    let decoded = {}

    try {
        decoded = jwt.verify(token, secretKey)
        decoded.status = true
        return {...decoded}
    } catch (err) {
        decoded.status = false
        decoded.message = err.message
        return {...decoded}
    }
}

function decode(payload) {
    return jwt.decode(payload)
}

function refresh() {
    return jwt.sign({}, secretKey, {
        algorithm: 'HS256',
        expiresIn: '14d',
    })
}

async function refreshVerify(token, email) {    
    try {
        const data = await RedisClient.get(token)
        
        if(email === data) {
            try {
                jwt.verify(token, secretKey)
                return true
                
            } catch(err) {
                console.log(`1: ${err}`)
                return false
            }

        } else {
            return false
        }

    } catch(err) {
        console.log(`2: ${err}`)
        return false
    }
}

module.exports = {
    sign, verify, refresh, refreshVerify, decode
}