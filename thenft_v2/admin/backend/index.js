const { node, env_flag } = require('./config');

async function server() {
//    const redis = await require('./module/redis.module');
//    await redis.connect();

    const ssh = await require('./module/ssh.module');
    const mongoose = await require('./module/mongo.module');

    env_flag? ssh(mongoose()):mongoose()
    
    const app = await require('./module/express.module');

    app.listen(node.port, () => {
        console.log(`listening port ${node.port}`)
    })
}

server();