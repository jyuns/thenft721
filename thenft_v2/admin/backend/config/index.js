const dotenv = require('dotenv');
const fs = require('fs');

const env_found = dotenv.config();
const env_flag = process.env.NODE_ENV == 'development'? true:false;

if(env_found.error) {
    console.error(`Couldn't find .env file`);
}

const node = {
    port: env_flag? '3000':'3000',
    white_list: env_flag? 'https://thenft.info':'http://localhost:8080'
}

const mongo = {
    uri: 'mongodb://127.0.0.1',
    port: '27017',
    db_name: env_flag? 'thenft':'test'
}

const ssh = {
    username: 'ubuntu',
    host: '10.0.2.55',
    port: '22',
    dstPort: '27017',
    privateKey: env_flag? fs.readFileSync('/home/ubuntu/.ssh/thenft_db'):null
}

const s3 = {
    accessKeyId: "AKIAZ4UTYOXEWAXWCJE4",
    secretAccessKey: "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",
    region: "ap-northeast-2",
    bucket: env_flag? 'thenft':'thenft'
}

module.exports = { node, mongo, ssh, env_flag, s3 }