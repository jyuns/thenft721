const argon2 = require('argon2');

async function hashPassword(password) {
    const result = await argon2.hash(password, {
        type: argon2.argon2id
    })

    return result
}

async function verifyPassword(hash, password) {
    const result = await argon2.verify(hash, password)
                            .catch( () => {return false})

    return result
}

module.exports = {
    hashPassword,
    verifyPassword,
}