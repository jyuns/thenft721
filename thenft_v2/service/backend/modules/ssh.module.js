const tunnel = require('tunnel-ssh')
const { ssh } = require('../config');

module.exports = (fn) => {
    return tunnel(ssh, (error, server) => {
        if(error) {
            console.log(`SSH Connection Error: ${error}`)
        } else {
            console.log(`SSH OK`)
            fn
        }
    })
}