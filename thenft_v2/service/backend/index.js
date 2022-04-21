const { node, env_flag } = require('./config');

async function server() {
    const redis = await require('./modules/redis.module');
    await redis.connect();

    const ssh = await require('./modules/ssh.module');
    const mongoose = await require('./modules/mongo.module');

    env_flag? ssh(mongoose()):mongoose()
    
    const app = await require('./modules/express.module');

    app.listen(node.port, () => {
        console.log(`listening port ${node.port}`)
    })
}

server();