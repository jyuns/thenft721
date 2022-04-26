const axios = require('../../utils/axios.util')();
const cookie = require('../../utils/cookie.util');

const label = 'auth'

const search = {
    namespaced: true,

    state: {
        // eslint-disable-next-line no-useless-escape
        EMAIL: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/,
        // eslint-disable-next-line no-useless-escape
        NICKNAME: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,11}$/, //! 욕설 제거, 한글 추가 등 진행
        // eslint-disable-next-line no-useless-escape
        PASSWORD: /^.{6,20}$/,
        // eslint-disable-next-line no-useless-escape
        CODE: /^[0-9]{10,}$/,
    },

    actions: {

        VERIFY: async(context, payload) => {

            let result = await axios({
                method: 'post',
                url: `/${label}/verify`,
                data: {
                    ...payload
                }
            }).catch(err => {return err.response})

            return result
        },

        SIGNUP: async(context, payload) => {

            let data = {}

            data.email = payload.email
            data.nickname = payload.nickname
            data.password = payload.password
            data.code = payload.code
            data.newsletter = payload.check.newsletter

            let result = await axios({
                method: 'post',
                url: `/${label}/signup`,
                data: {
                    ...data
                }
            }).catch(err => {return err.response})
            
            return result
        },

        SIGNIN: async(context, payload) => {
            let data = {}

            data.email = payload.email
            data.password = payload.password

            let result = await axios({
                method: 'post',
                url: `/${label}/signin`,
                data: {
                    ...data
                }
            }).catch(err => {return err.response})

            cookie.set('access_token', result.data.accessToken)
            cookie.set('refreshToken', result.data.refreshToken)

            return result
        }
    }
}

module.exports = search