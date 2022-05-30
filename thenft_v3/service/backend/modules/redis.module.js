const { redis } = require('../config');

const Redis = require('redis')
const RedisClient = Redis.createClient({url:`${redis.uri}:${redis.port}`});

RedisClient.on('error', (error) => {
    console.log(`Redis Error: ${error}`)
});

RedisClient.on('ready', () => {
    console.log(`Redis Listening to port ${redis.port}`)
});

module.exports = RedisClient;