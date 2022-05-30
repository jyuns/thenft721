const { node } = require('./config');

const server = async () => {

    const app = await require('./modules/express.module');
    
    const mongo = await require('./modules/mongo.module');
    await mongo();

    const redis = await require('./modules/redis.module');
    await redis.connect();
    
    app.listen(node.port, () => {
        console.log(`listening port ${node.port}`)
    })
}

server()