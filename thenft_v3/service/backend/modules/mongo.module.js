const mongoose = require('mongoose');
const { mongo } = require('../config')

mongoose.connection.on('error', (err) => {
    console.log(`mongodb server error: ${err}`)
})

mongoose.connection.on('open', () => {
    console.log(`mongodb server start!`)
})

module.exports = () => {
    mongoose.connect(`${mongo.uri}/${mongo.name}`, { useNewUrlParser: true })
}