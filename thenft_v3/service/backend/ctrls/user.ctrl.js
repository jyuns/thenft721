const User = require('../models/user/user.model');

const { emptyCheck, nicknameCheck, emailCheck, passwordCheck } = require('../helpers');

const { hashPwd, verifyPwd } = require('../utils/argon.util'); 
const jwt = require('../utils/token.util');
const RedisClient = require('../modules/redis.module');

// project 관련 변수
const signin_info = {
    'email': 1,
    'nickname': 1,
    'password': 1,
    'membership.role': 1,
    'optional': 1,
}

// create
async function create(req, res, next) {
    let data = {};
    data.password = req?.body?.password;

    const encrypted = await hashPwd(data.password);

    if(!encrypted) throw({
        name: 'password',
        message: '패스워드 암호화 과정에서 오류가 발생하였습니다.'
    });

    req.body.password = encrypted;

    let user = new User({...req.body});

    await user.save()
              .catch(() => { throw new Error })
    
    req.body.password = data.password;

    next()
}

// read
async function read(req, res) {
    let data = req.body

    //? 활성화 유저만 검색되도록 정의
    data.active = true

    //? password 제외 출력
    let result = await User.findOne({...data}, {...basic_info})
                           .catch(() => { throw new Error })

    return res.status(200).json(result)
}

// update
async function update(req, res) {
    let data = req.body
    
    await User.findByIdAndUpdate({_id: data._id}, {...data})
              .catch(() => { throw new Error })

    return res.status(200).send('success')
}

// remove
async function remove(req, res) {
    let data = {}
    data._id = req?.body?._id

    let valid = true
    let find 

    valid = emptyCheck(data._id);
    find = await User.findOne({_id: data._id, active: true})
                     .lean()
                     .exec();
    valid = emptyCheck(find);

    if(!valid) throw({
        name: '_id',
        message: '잘못된 접근입니다.'
    })

    await User.findByIdAndDelete({_id: data._id})
              .catch(() => { throw new Error })

    return res.status(200).send('success')
}

async function signin(req, res) {
    let data = {};
    
    data.email = req?.body?.email;
    data.password = req?.body?.password;

    let valid = true
    let find;

    find = await User.findOne({email: data.email, active: true},
                              {...signin_info})
                     .lean()
                     .exec();

    if(!valid) throw({
        name: 'email',
        message: '등록되지 않은 이메일입니다.'
    })

    valid = await verifyPwd(find.password, data.password);

    if(!valid) throw({
        name: 'password',
        message: '잘못된 비밀번호입니다. 다시 입력해주세요.'
    })

    delete find._id
    delete find.password
    delete find.optional

    // 회원정보 일치 시, access, refresh token 발급
    const accessToken = await jwt.sign({...find})

    await RedisClient.set(accessToken, JSON.stringify(find))
    
    const refreshToken = await jwt.refresh()

    await RedisClient.set(refreshToken, find.email)

    return res.status(200).json({
        message: '로그인 성공하였습니다.',
        accessToken,
        refreshToken,
    })
}

async function signout(req, res) {
    let data = {};

    data.authorization = req?.headers?.authorization;
    data.refresh = req?.headers?.refresh;

    let valid = true;
    valid = emptyCheck(data.authorization);

    const accessToken = data.authorization.split('Bearer ')[1];
    if(valid) await RedisClient.del(accessToken)
                               .catch(() => { throw new Error });

    valid = emptyCheck(data.refresh)

    if(valid) await RedisClient.del(data.refresh)
                               .catch(() => { throw new Error });

    return res.status(200)
}

async function auth(req, res, next) {
    let data = {}
    data.authorization = req?.headers?.authorization;

    let valid = true
    valid = emptyCheck(data.authorization)

    if(valid) {
        const accessToken = data.authorization.split('Bearer ')[1];
        const result = jwt.verify(accessToken);
        
        if(result.status) {
            delete data.authorization;

            data.email = result?.email;
            data.nickname = result?.nickname;

            data.membership = {}
            data.membership.role = result?.membership?.role;

            return res.status(200).json({...data})

        } else {
            next()
        }

    } else {
        next()
    }
}

async function refresh(req, res, next) {
    let data = {}

    data.authorization = req?.headers?.authorization;
    data.refresh = req?.headers?.refresh;

    let valid = true

    valid = emptyCheck(data.authorization)
    
    if(!valid) {
        throw ({
            name: 'accessToken',
            message: 'No Authorized!'
        })
    }

    valid = emptyCheck(data.refresh)

    if(valid) {
        const accessToken = data.authorization.split('Bearer ')[1];
        const refreshToken = data.refresh;

        let decoded = jwt.decode(accessToken);

        valid = emptyCheck(decoded);

        if(!valid) throw ({
            name: 'accessToken',
            message: 'No Authorized!'
        })

        let refresh = await jwt.refreshVerify(refreshToken, decoded.email);

        if(refresh === true) {
            delete decoded.iat
            delete decoded.exp

            let newAccessToken = jwt.sign(decoded);

            return res.status(200).json({
                ...decoded, refreshToken, accessToken:newAccessToken,
            })
        } else {
            throw ({
                name: 'refreshToken',
                message: 'No Authorized!'
            })
        }
    } else {
        throw ({
            name: 'accessToken',
            message: 'No Authorized!'
        })
    }
}

// duplicate
async function duplicate(req, res, next) {
    let data = {};

    data = req?.body
    let keys = Object.keys(data)
    
    for(i in keys) {
        let valid = true;
        let find

        switch(keys[i]) {
            case 'nickname':
                valid = nicknameCheck(data.nickname);

                find = await User.findOne({nickname: data.nickname});
                valid = emptyCheck(find);

                if(valid) throw ({
                    name: 'nickname',
                    message: '이미 등록된 닉네임입니다.'
                });
                break;

            case 'email':
                valid = emailCheck(data.email);

                find = await User.findOne({email: data.email});
                valid = emptyCheck(find);

                if(valid) throw ({
                    name: 'email',
                    message: '이미 등록된 이메일입니다.'
                });
                break;
        }
    }

    next()
}

// validate
async function validate(req, res, next) {
    let data = {};
    data = req?.body

    let options = [];
    
    switch(req.url) {
        case '/signin':
            options = ['email', 'password'];
            break;

        case '/read':
            options = ['email'];
            break;

        case '/create':
            options = ['email', 'nickname', 'password'];
            break;
    }

    for(o in options) {
        let valid = true;
        
        switch(options[o]) {
            case 'nickname':
                valid = emptyCheck(data.nickname);

                if(!valid) throw ({
                    name: 'nickname',
                    message: '빈 값입니다.'
                });
                
                break;

            case 'email':
                valid = emptyCheck(data.email);

                if(!valid) throw ({
                    name: 'email',
                    message: '빈 값입니다.'
                });
                
                break;

            case 'password':
                valid = emptyCheck(data.password);

                if(!valid) throw ({
                    name: 'password',
                    message: '빈 값입니다.'
                });
                
                break;

            case 'email':
                valid = emptyCheck(data.email);

                if(!valid) throw ({
                    name: 'email',
                    message: '빈 값입니다.'
                });
                
                break;
        }
    }

    let keys = Object.keys(data)

    for(i in keys) {
        let valid = true;

        switch(keys[i]) {
            case 'nickname':
                valid = nicknameCheck(data.nickname);
            
                if(!valid) throw ({
                    name: 'nickname',
                    message: '잘못된 유형의 닉네임입니다(12자리 이내, 특수문자 불가능).'
                });
                break;

            case 'email':
                valid = emailCheck(data.email);

                if(!valid) throw ({
                    name: 'email',
                    message: '잘못된 유형의 이메일입니다.'
                });                
                break;
            
            case 'password':
                valid = passwordCheck(data.password);

                if(!valid) throw ({
                    name: 'password',
                    message: '잘못된 유형의 비밀번호입니다(6자리 이상 20자리 이하).'
                });                
                break;
        }
    }

    next();
}

module.exports = {
    create, read, update, remove, validate, duplicate,
    signin, auth, refresh
}
