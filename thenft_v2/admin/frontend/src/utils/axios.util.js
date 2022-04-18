const axios = require('axios');

const env_flag = process.env.NODE_ENV == 'development'? true:false

const instance = axios.create({
        baseURL: env_flag? 'http://localhost:3000/api':'https://thenft.info/api',
    })

module.exports = instance