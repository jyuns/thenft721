//const Collection = require('../models/collection.model');

function load(req, res, next) {
    console.log('load collection ctrl')
    next()
}

module.exports = { load }