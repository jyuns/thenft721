const Code = require('../models/code/code.model');
const User = require('../models/user/user.model');

const { emptyCheck, codeCheck } = require('../helpers');

async function validate(req, res, next) {
    let data = {}
    data.code = req?.body?.code

    let valid = true
    valid = emptyCheck(data.code);
    valid = codeCheck(data.code);

    if(!valid) throw ({
        name: 'code',
        message: '잘못된 유형의 멤버십 코드입니다.'
    })

    let available = await Code.check(data.code)

    if(!available) throw ({
        name: 'code',
        message: '이미 사용된 멤버십 코드입니다.'
    })

    next()
}

async function register(req, res, next) {

    let data = {}
    data.membership = {}
    
    data.email = req?.body?.email;
    data.nickname = req?.body?.nickname;
    data.membership.role = req?.body?.membership?.role;
    data.code = req?.body?.code;

    console.log(data)

    let valid = true

    valid = emptyCheck(data.email);
    if(!valid) throw({
        name: 'email',
        message: '잘못된 접근입니다.'
    })

    valid = emptyCheck(data.nickname);
    if(!valid) throw({
        name: 'nickname',
        message: '잘못된 접근입니다.'
    })

    valid = emptyCheck(data.membership.role);
    if(!valid) throw({
        name: 'membership.role',
        message: '잘못된 접근입니다.'
    })

    if(data.membership.role === '프로느프터') throw({
        name: 'membership.role',
        message: '이미 멤버십 코드 등록한 사용자입니다.'
    })

    if(valid) {

        await User.findOneAndUpdate({
            email: data.email,
            nickname: data.nickname,
        }, {
            'membership.role': '프로느프터',
            'membership.code': data.code,
        }).catch( () => { throw new Error })

        await Code.findOneAndUpdate({
            code: data.code,
        }, {
            used: true,
        }).catch( () => { throw new Error })

    } else {
        throw({
            name: 'register',
            message: '멤버십 코드 등록 과정에서 오류가 발생하였습니다.'
        })        
    }

    return res.status(200).json({
        name: 'code',
        message: '멤버십 코드 등록이 완료되었습니다.'
    })
}

module.exports = {
    validate, register
}