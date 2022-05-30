const dotenv = require('dotenv');
const env_found = dotenv.config();

if(env_found.error) {
    console.error(`Couldn't find .env file`);
}

const node = {
    port: 3000,
}

const mongo = {
    uri: 'mongodb://127.0.0.1',
    port: 27017,
    name: 'thenftV3'
}

const redis = {
    uri: 'redis://localhost',
    port: 6379
}

const secret_key = 'thenft721V3'

module.exports = { node, mongo, redis, secret_key }