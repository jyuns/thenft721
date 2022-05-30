//? declare value
module.exports.kst = () => {
    // 9 hours = 32,400,000 ms
    return new Date(Date.now() + 32400000)
}

//? validation check
module.exports.emptyCheck = (val) => {
    return (val === undefined || val === null || val === '')? false: true
}

module.exports.maxLengthCheck = (val, length) => {
    return val?.length <= length? true : false
}

module.exports.minLengthCheck = (val, length) => {
    return val?.length >= length? true : false
}

module.exports.nicknameCheck = (val) => {
    let valid = false;

    const nickname = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,11}$/;
    const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    valid = !nickname.test(val)
    valid = !special.test(val)

    return valid
}

module.exports.emailCheck = (val) => {
    let valid = false;

    const email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/

    valid = email.test(val)

    return valid
}

module.exports.passwordCheck = (val) => {
    let valid = false;

    const password = /^.{6,20}$/;

    valid = password.test(val)

    return valid
}

module.exports.codeCheck = (val) => {
    let valid = false;

    const code = /^[0-9]{10}$/;

    valid = code.test(val)

    return valid
}

//? wrap function
module.exports.wrapAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
}