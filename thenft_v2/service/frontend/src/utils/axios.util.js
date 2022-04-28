const axios = require('axios');

const env_flag = process.env.NODE_ENV == 'development'? true:false

const instance = (access, refresh) => {
    let headers = {};
    access? headers.Authorization = `Bearer ${access}` : null;
    refresh? headers.refresh = `${refresh}` : null;

    return axios.create({
        baseURL: env_flag? 'http://localhost:3000/api':'https://thenft.info/api',
        headers: headers
    })
}

module.exports = instance