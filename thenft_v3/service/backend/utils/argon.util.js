const argon2 = require('argon2');

async function hashPwd(pwd) {
    const result = await argon2.hash(pwd, {
        type: argon2.argon2id
    })

    return result
}

async function verifyPwd(hashed, pwd) {
    const result = await argon2.verify(hashed, pwd)
                               .catch(() => {return false})

    return result
}

module.exports = {
    hashPwd,
    verifyPwd,
}