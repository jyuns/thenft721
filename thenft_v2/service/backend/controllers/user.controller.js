const User = require('../models/user.model');
const Promotion = require('../models/promotion.model');

const jwt = require('../utils/token.util');
const RedisClient = require('../modules/redis.module');

//const { authJWT } = require('../utils/auth.util');
const { hashPassword, verifyPassword } = require('../utils/argon.util');

async function signup(req, res, next) {
    let data = req.body
    console.log(data)

    //? default role setting
    data.role = '느프터'

    //? nickname check
    const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if(!data.nickname) return
    if(special.test(data.nickname) && (data.nickname.length>12)) {
        return res.status(409).json({
            type: 'nickname',
            message: '잘못된 유형의 닉네임입니다(12자리 이내, 특수문자 불가능)'
        })
    }

    let duplicated = await User.duplicate({nickname: data.nickname})
    console.log(duplicated)
    
    if(duplicated) {
        return res.status(409).json({
            type: 'nickname',
            message: '이미 등록된 닉네임입니다.'
        })
    }

    duplicated = await User.duplicate({email: data.email})

    if(duplicated) {
        return res.status(409).json({
            type: 'email',
            message: '이미 등록된 이메일입니다.'
        })
    }

    if(!data.password) return
    const encrypted = await hashPassword(data.password);

    if(!encrypted) {
        return res.status(409).json({
            type: 'password',
            message: '비밀번호 암호화 과정에서 오류가 발생하였습니다.'
        })
    }

    data.password = encrypted

    let available = await Promotion.available(data.code)

    if(available && (data.code.length == 10)) {
        data.role = '프로느프터'
        await Promotion.used(data.code)
    }

    let user = new User({
        ...data
    })

    let created = await user.save()
    
    if(created) {
        return res.json({
            status: true,
            message: '성공적으로 가입되었습니다.'
        })
    } else {
        return res.json({
            status: false,
            message: '가입 실패되었습니다. 잠시 후 다시 시도해주세요.'
        })
    }
}

async function signin(req, res, next) {
    let data = req.body;

    if(!data.email) return
    let find = await User.findOne({email: data.email})
                               .lean()
                               .exec()
    if(!find) {
        return res.status(409).json({
            type: 'email',
            message: '등록되지 않은 이메일입니다.'
        })
    }

    if(!data.password) return
    let verified = await verifyPassword(find.password, data.password)

    if(!verified) {
        return res.status(409).json({
            type: 'password',
            message: '잘못된 비밀번호입니다.'
        })
    }

    delete find.password
    delete find.newsletter
    delete find.code

    const accessToken = await jwt.sign({
        ...find
    })

    const refreshToken = await jwt.refresh()
    await RedisClient.set(find.email, refreshToken)

    return res.json({
        message: '로그인 성공하였습니다.',
        accessToken, refreshToken
    })
}

async function signout() {

}

async function verify(req, res, next) {
    let data = req.body;

    let available = await Promotion.available(data.code)
    
    if(!available || (data.code.length != 10)) {
        return res.status(409).json({
            type: 'code',
            message: '유효하지 않은 초대코드입니다.'
        })
    } else {
        return res.json({
            type: null,
            message: '초대코드 확인이 완료되었습니다.',
        })
    }
}

async function update(req, res, next) {
    let data = req.body;

    data.role = '느프터';

    let available = await Promotion.available(data.code)

    if(!available && (data.code.length != 10)) {
        return res.status(409).json({
            type: 'code',
            message: '유효하지 않은 초대코드입니다.'
        })
    } else {
        data.role = '프로느프터'
        await Promotion.used(data.code);
        await User.findOneAndUpdate({
            email: data.email
        }, {
            $set: {
                code: data.code,
                role: data.role
            }
        }).lean()
          .exec()

        return next()
    }
}

module.exports = { signup, signin, signout, verify, update }